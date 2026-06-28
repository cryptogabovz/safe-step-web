import config from 'config';
import { PaymentStatus } from '../../types/order.js';
import { registerPaymentMethod } from '../checkout/services/getAvailablePaymentMethods.js';
import { getSetting } from '../setting/services/setting.js';
import { isSquareConfigured } from './services/squareConfig.js';

export default async () => {
  const squarePaymentStatus = {
    order: {
      paymentStatus: {
        square_authorized: {
          name: 'Authorized',
          isDefault: false,
          isCancelable: true,
          badge: 'warning'
        },
        square_captured: {
          name: 'Captured',
          isDefault: false,
          isCancelable: false,
          badge: 'success'
        },
        square_failed: {
          name: 'Failed',
          isDefault: false,
          isCancelable: true,
          badge: 'critical'
        },
        square_refunded: {
          name: 'Refunded',
          badge: 'destructive',
          isCancelable: false,
          isDefault: false
        },
        square_partial_refunded: {
          name: 'Partial Refunded',
          badge: 'destructive',
          isCancelable: false,
          isDefault: false
        }
      },
      psoMapping: {
        'square_authorized:*': 'processing',
        'square_captured:*': 'processing',
        'square_captured:delivered': 'completed',
        'square_failed:*': 'new',
        'square_refunded:*': 'closed',
        'square_partial_refunded:*': 'processing',
        'square_partial_refunded:delivered': 'completed'
      }
    }
  } as {
    order: {
      paymentStatus: {
        [key: string]: PaymentStatus;
      };
      psoMapping: {
        [key: string]: string;
      };
    };
  };
  config.util.setModuleDefaults('oms', squarePaymentStatus);

  registerPaymentMethod({
    init: async () => ({
      code: 'square',
      name: await getSetting('squareDisplayName', 'Square')
    }),
    // Solo se ofrece si está habilitado en el admin Y las claves están en el entorno.
    validator: async () => {
      const status = await getSetting('squarePaymentStatus', 0);
      return parseInt(status as string, 10) === 1 && isSquareConfigured();
    }
  });
};
