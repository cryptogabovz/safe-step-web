/**
 * Cliente REST de Square (sin dependencia npm — usa fetch nativo de Node 20).
 * Evita la rotación de API del SDK oficial; la API REST es estable y versionada
 * por la cabecera `Square-Version`.
 */
import { getSquareApiBase } from './squareConfig.js';

const SQUARE_VERSION = '2024-10-17';

interface SquareError {
  detail?: string;
  code?: string;
  category?: string;
}

function extractError(data: { errors?: SquareError[] }): string {
  return data?.errors?.[0]?.detail || 'Square request failed';
}

interface CreatePaymentArgs {
  accessToken: string;
  environment: string;
  sourceId: string;
  idempotencyKey: string;
  amount: number; // entero en la unidad menor de la moneda (centavos)
  currency: string;
  locationId: string;
  autocomplete: boolean; // true = captura inmediata; false = solo autorización
  referenceId?: string;
  note?: string;
}

export async function createSquarePayment(args: CreatePaymentArgs) {
  const base = getSquareApiBase(args.environment);
  const res = await fetch(`${base}/v2/payments`, {
    method: 'POST',
    headers: {
      'Square-Version': SQUARE_VERSION,
      Authorization: `Bearer ${args.accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      source_id: args.sourceId,
      idempotency_key: args.idempotencyKey,
      amount_money: { amount: args.amount, currency: args.currency },
      location_id: args.locationId,
      autocomplete: args.autocomplete,
      reference_id: args.referenceId,
      note: args.note
    })
  });
  const data = (await res.json()) as { payment?: any; errors?: SquareError[] };
  if (!res.ok || !data.payment) {
    throw new Error(extractError(data));
  }
  return data.payment;
}

interface RefundArgs {
  accessToken: string;
  environment: string;
  idempotencyKey: string;
  paymentId: string;
  amount: number;
  currency: string;
  reason?: string;
}

export async function refundSquarePayment(args: RefundArgs) {
  const base = getSquareApiBase(args.environment);
  const res = await fetch(`${base}/v2/refunds`, {
    method: 'POST',
    headers: {
      'Square-Version': SQUARE_VERSION,
      Authorization: `Bearer ${args.accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      idempotency_key: args.idempotencyKey,
      payment_id: args.paymentId,
      amount_money: { amount: args.amount, currency: args.currency },
      reason: args.reason
    })
  });
  const data = (await res.json()) as { refund?: any; errors?: SquareError[] };
  if (!res.ok || !data.refund) {
    throw new Error(extractError(data));
  }
  return data.refund;
}
