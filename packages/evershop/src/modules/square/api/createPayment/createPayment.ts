import {
  select,
  insertOnUpdate,
  startTransaction,
  commit,
  rollback
} from '@evershop/postgres-query-builder';
import smallestUnit, { display } from 'zero-decimal-currencies';
import { emit } from '../../../../lib/event/emitter.js';
import { error } from '../../../../lib/log/logger.js';
import { getConnection, pool } from '../../../../lib/postgres/connection.js';
import { INVALID_PAYLOAD, OK } from '../../../../lib/util/httpStatus.js';
import { EvershopRequest } from '../../../../types/request.js';
import { EvershopResponse } from '../../../../types/response.js';
import addOrderActivityLog from '../../../oms/services/addOrderActivityLog.js';
import { updatePaymentStatus } from '../../../oms/services/updatePaymentStatus.js';
import { getSetting } from '../../../setting/services/setting.js';
import {
  getSquareConfig,
  isSquareConfigured
} from '../../services/squareConfig.js';
import { createSquarePayment } from '../../services/squareClient.js';

export default async (
  request: EvershopRequest,
  response: EvershopResponse,
  // 3er parámetro requerido: con 2 args el framework trata el handler como
  // pasivo y vuelve a llamar next() → ERR_HTTP_HEADERS_SENT al enviar JSON.
  next
) => {
  const { order_id, source_id } = request.body;

  if (!isSquareConfigured()) {
    response.status(INVALID_PAYLOAD);
    response.json({
      error: { status: INVALID_PAYLOAD, message: 'Square is not configured' }
    });
    return;
  }

  // Cargar la orden (order_id = uuid).
  const order = await select()
    .from('order')
    .where('uuid', '=', order_id)
    .load(pool);

  if (!order) {
    response.status(INVALID_PAYLOAD);
    response.json({
      error: { status: INVALID_PAYLOAD, message: 'Invalid order' }
    });
    return;
  }

  // Idempotencia: si ya hay una transacción para esta orden, no recobrar.
  const existing = await select()
    .from('payment_transaction')
    .where('payment_transaction_order_id', '=', order.order_id)
    .load(pool);
  if (existing) {
    response.status(OK);
    response.json({ data: { success: true, orderId: order.uuid } });
    return;
  }

  const config = getSquareConfig();
  const mode = (await getSetting('squarePaymentMode', 'capture')) as string;
  const autocomplete = mode !== 'authorizeOnly';
  const currency = order.currency;
  const amount = parseInt(smallestUnit(order.grand_total, currency), 10);

  const connection = await getConnection();
  try {
    const payment = await createSquarePayment({
      accessToken: config.accessToken,
      environment: config.environment,
      sourceId: source_id,
      idempotencyKey: order.uuid,
      amount,
      currency,
      locationId: config.locationId,
      autocomplete,
      referenceId: order.order_number ? String(order.order_number) : order.uuid,
      note: `Order ${order.order_number || order.uuid}`
    });

    await startTransaction(connection);

    const charged = payment?.amount_money?.amount ?? amount;
    await insertOnUpdate('payment_transaction', [
      'transaction_id',
      'payment_transaction_order_id'
    ])
      .given({
        amount: parseFloat(display(charged, currency)),
        payment_transaction_order_id: order.order_id,
        transaction_id: payment.id,
        transaction_type: 'online',
        payment_action: autocomplete ? 'Automatic' : 'authorize'
      })
      .execute(connection);

    await updatePaymentStatus(
      order.order_id,
      autocomplete ? 'square_captured' : 'square_authorized',
      connection
    );

    await addOrderActivityLog(
      order.order_id,
      `Payment ${
        autocomplete ? 'captured' : 'authorized'
      } via Square. Transaction ID: ${payment.id}`,
      false,
      connection
    );

    await emit('order_placed', { ...order });

    await commit(connection);

    response.status(OK);
    response.json({ data: { success: true, orderId: order.uuid } });
  } catch (err) {
    await rollback(connection);
    error(err);
    response.status(INVALID_PAYLOAD);
    response.json({
      error: {
        status: INVALID_PAYLOAD,
        message: err instanceof Error ? err.message : 'Square payment failed'
      }
    });
  }
};
