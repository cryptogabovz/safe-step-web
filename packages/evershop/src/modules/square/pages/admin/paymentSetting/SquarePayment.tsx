import { InputField } from '@components/common/form/InputField.js';
import { RadioGroupField } from '@components/common/form/RadioGroupField.js';
import { ToggleField } from '@components/common/form/ToggleField.js';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@components/common/ui/Card.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';

interface SquarePaymentProps {
  setting: {
    squarePaymentStatus: true | false | 0 | 1;
    squareDisplayName: string;
    squarePaymentMode: string;
    squareApplicationId: string | null;
    squareLocationId: string | null;
    squareEnvironment: string | null;
  };
}

export default function SquarePayment({
  setting: {
    squarePaymentStatus,
    squareDisplayName,
    squarePaymentMode,
    squareApplicationId,
    squareLocationId,
    squareEnvironment
  }
}: SquarePaymentProps) {
  const envConfigured = Boolean(squareApplicationId && squareLocationId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{_('Square Payment')}</CardTitle>
        <CardDescription>
          {_('Configure your Square payment gateway')}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1 items-center flex">
            <h4>{_('Enable?')}</h4>
          </div>
          <div className="col-span-2">
            <ToggleField
              name="squarePaymentStatus"
              defaultValue={squarePaymentStatus}
              trueValue={1}
              falseValue={0}
            />
          </div>
        </div>
      </CardContent>

      <CardContent className="pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1 items-center flex">
            <h4>{_('Display Name')}</h4>
          </div>
          <div className="col-span-2">
            <InputField
              name="squareDisplayName"
              placeholder={_('Display Name')}
              defaultValue={squareDisplayName || ''}
            />
          </div>
        </div>
      </CardContent>

      <CardContent className="pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1 items-center flex">
            <h4>{_('Payment mode')}</h4>
          </div>
          <div className="col-span-2">
            <RadioGroupField
              name="squarePaymentMode"
              defaultValue={squarePaymentMode || 'capture'}
              options={[
                { label: _('Authorize only'), value: 'authorizeOnly' },
                { label: _('Capture'), value: 'capture' }
              ]}
            />
          </div>
        </div>
      </CardContent>

      {/* Las claves se configuran por variables de entorno (no en la BD). */}
      <CardContent className="pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1 flex">
            <h4>{_('Credentials (env vars)')}</h4>
          </div>
          <div className="col-span-2 text-sm text-gray-600 space-y-1">
            <p>
              {_('Environment')}:{' '}
              <strong>{squareEnvironment || 'sandbox'}</strong>
            </p>
            <p>
              {_('Application ID')}:{' '}
              <strong>{squareApplicationId || _('Not set')}</strong>
            </p>
            <p>
              {_('Location ID')}:{' '}
              <strong>{squareLocationId || _('Not set')}</strong>
            </p>
            <p className="text-xs text-gray-400 pt-1">
              {_(
                'Set SQUARE_ENVIRONMENT, SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID and SQUARE_ACCESS_TOKEN as environment variables. The Access Token is never stored in the database.'
              )}
            </p>
            {!envConfigured && (
              <p className="text-xs text-destructive pt-1">
                {_(
                  'Square is not fully configured yet — add the environment variables to enable it at checkout.'
                )}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export const layout = {
  areaId: 'paymentSetting',
  sortOrder: 12
};

export const query = `
  query Query {
    setting {
      squarePaymentStatus
      squareDisplayName
      squarePaymentMode
      squareApplicationId
      squareLocationId
      squareEnvironment
    }
  }
`;
