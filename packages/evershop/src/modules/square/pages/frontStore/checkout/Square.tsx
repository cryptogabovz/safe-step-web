import { Button } from '@components/common/ui/Button.js';
import {
  useCheckout,
  useCheckoutDispatch
} from '@components/frontStore/checkout/CheckoutContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

// Estado compartido entre el formulario (formRenderer) y el botón
// (checkoutButtonRenderer), que el checkout renderiza por separado.
const squareRuntime: { card: any; sourceId: string | null } = {
  card: null,
  sourceId: null
};

let squareSdkPromise: Promise<any> | null = null;
function loadSquareSdk(environment: string): Promise<any> {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if ((window as any).Square) return Promise.resolve((window as any).Square);
  if (squareSdkPromise) return squareSdkPromise;
  const src =
    environment === 'production'
      ? 'https://web.squarecdn.com/v1/square.js'
      : 'https://sandbox.web.squarecdn.com/v1/square.js';
  squareSdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve((window as any).Square);
    script.onerror = () => reject(new Error('Failed to load Square SDK'));
    document.head.appendChild(script);
  });
  return squareSdkPromise;
}

interface SquareCardFormProps {
  applicationId: string | null;
  locationId: string | null;
  environment: string | null;
  createPaymentApi: string;
}

function SquareCardForm({
  applicationId,
  locationId,
  environment,
  createPaymentApi
}: SquareCardFormProps) {
  const [ready, setReady] = useState(false);
  const submittedRef = useRef(false);
  const {
    cartId,
    orderId,
    orderPlaced,
    checkoutData: { paymentMethod }
  } = useCheckout();

  // Cargar el SDK de Square y montar el formulario de tarjeta.
  useEffect(() => {
    if (!applicationId || !locationId) return undefined;
    let cancelled = false;
    (async () => {
      try {
        const Square = await loadSquareSdk(environment || 'sandbox');
        if (cancelled || !Square) return;
        const payments = Square.payments(applicationId, locationId);
        const card = await payments.card();
        await card.attach('#square-card-container');
        squareRuntime.card = card;
        if (!cancelled) setReady(true);
        (window as any).tokenizeSquareCard = async () => {
          try {
            const result = await card.tokenize();
            if (result.status === 'OK') {
              squareRuntime.sourceId = result.token;
              return true;
            }
          } catch {
            /* fallthrough */
          }
          toast.error(_('Please check your card details and try again.'));
          return false;
        };
      } catch {
        toast.error(_('Could not load the Square payment form.'));
      }
    })();
    return () => {
      cancelled = true;
      try {
        squareRuntime.card?.destroy?.();
      } catch {
        /* noop */
      }
      squareRuntime.card = null;
      delete (window as any).tokenizeSquareCard;
    };
  }, [applicationId, locationId, environment]);

  // Tras colocar la orden, cobrar con el token y redirigir a la página de éxito.
  useEffect(() => {
    if (
      orderId &&
      orderPlaced &&
      paymentMethod === 'square' &&
      squareRuntime.sourceId &&
      !submittedRef.current
    ) {
      submittedRef.current = true;
      window
        .fetch(createPaymentApi, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            order_id: orderId,
            cart_id: cartId,
            source_id: squareRuntime.sourceId
          })
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            submittedRef.current = false;
            toast.error(
              data.error.message || _('Payment failed. Please try again.')
            );
          } else {
            window.location.href = `/checkout/success/${orderId}`;
          }
        })
        .catch(() => {
          submittedRef.current = false;
          toast.error(_('Payment failed. Please try again.'));
        });
    }
  }, [orderId, orderPlaced]);

  if (!applicationId || !locationId) {
    return (
      <p className="text-sm text-destructive py-3">
        {_('Square is not configured. Please contact the store.')}
      </p>
    );
  }

  return (
    <div className="square__app py-3">
      <div id="square-card-container" />
      {!ready && (
        <div className="text-sm text-gray-500 py-2">
          {_('Loading secure payment form…')}
        </div>
      )}
    </div>
  );
}

function SquareCheckoutButton() {
  const { checkout } = useCheckoutDispatch();
  const { loadingStates, orderPlaced } = useCheckout();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const tokenize = (window as any)?.tokenizeSquareCard;
      if (!tokenize) {
        toast.error(_('Payment form is not ready yet. Please wait a moment.'));
        return;
      }
      const ok = await tokenize();
      if (!ok) return;
      await checkout();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : _('An unexpected error occurred. Please try again.')
      );
    }
  };

  const isDisabled = loadingStates.placingOrder || orderPlaced;

  return (
    <Button
      variant="default"
      size="xl"
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      className="w-full"
    >
      {loadingStates.placingOrder
        ? _('Processing Payment…')
        : _('Pay now')}
    </Button>
  );
}

interface SquareMethodProps {
  setting: {
    squareDisplayName: string;
    squareApplicationId: string | null;
    squareLocationId: string | null;
    squareEnvironment: string | null;
  };
  createPaymentApi: string;
}

export default function SquareMethod({
  setting,
  createPaymentApi
}: SquareMethodProps) {
  const { registerPaymentComponent } = useCheckoutDispatch();
  useEffect(() => {
    registerPaymentComponent('square', {
      nameRenderer: () => <span>{setting.squareDisplayName || 'Square'}</span>,
      formRenderer: () => (
        <SquareCardForm
          applicationId={setting.squareApplicationId}
          locationId={setting.squareLocationId}
          environment={setting.squareEnvironment}
          createPaymentApi={createPaymentApi}
        />
      ),
      checkoutButtonRenderer: () => <SquareCheckoutButton />
    });
  }, [
    registerPaymentComponent,
    setting.squareDisplayName,
    setting.squareApplicationId,
    setting.squareLocationId,
    setting.squareEnvironment,
    createPaymentApi
  ]);

  return null;
}

export const layout = {
  areaId: 'checkoutFormAfter',
  sortOrder: 12
};

export const query = `
  query Query {
    setting {
      squareDisplayName
      squareApplicationId
      squareLocationId
      squareEnvironment
    }
    createPaymentApi: url(routeId: "createPayment")
  }
`;
