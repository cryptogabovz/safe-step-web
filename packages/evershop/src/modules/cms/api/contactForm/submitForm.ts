import { OK, INTERNAL_SERVER_ERROR, INVALID_PAYLOAD } from '../../../../lib/util/httpStatus.js';

export default async (request, response, next) => {
  const { name, email, phone, company, message, interest } = request.body || {};

  if (!name || !email || !message) {
    response.status(INVALID_PAYLOAD).json({ error: 'Nombre, email y mensaje son requeridos.' });
    return;
  }

  const locationId = process.env.GHL_LOCATION_ID;
  const apiKey = process.env.GHL_API_KEY;

  if (!locationId || !apiKey) {
    console.error('[ContactForm] GHL_LOCATION_ID or GHL_API_KEY not set');
    response.status(INTERNAL_SERVER_ERROR).json({ error: 'Configuración incompleta en el servidor.' });
    return;
  }

  const [firstName, ...rest] = name.trim().split(' ');
  const lastName = rest.join(' ') || '';

  const ghlPayload = {
    locationId,
    firstName,
    lastName,
    email: email.trim(),
    phone: phone?.trim() || undefined,
    companyName: company?.trim() || undefined,
    source: 'Website — Formulario de Contacto',
    customFields: interest
      ? [{ key: 'product_interest', field_value: interest }]
      : undefined,
    tags: ['website-contact'],
    notes: message?.trim(),
  };

  try {
    const ghlResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify(ghlPayload),
    });

    if (!ghlResponse.ok) {
      const errText = await ghlResponse.text();
      console.error('[ContactForm] GHL error:', ghlResponse.status, errText);
      response.status(INTERNAL_SERVER_ERROR).json({ error: 'No se pudo enviar el formulario. Intenta de nuevo.' });
      return;
    }

    response.status(OK).json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[ContactForm] Fetch error:', msg);
    response.status(INTERNAL_SERVER_ERROR).json({ error: 'Error de conexión. Intenta de nuevo.' });
  }
};
