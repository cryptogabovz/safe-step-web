-- ============================================================
-- SAFE STEP — Páginas Legales (Row[] format for Editor component)
-- ============================================================
BEGIN;

DELETE FROM cms_page_description
WHERE url_key IN ('terminos-y-condiciones', 'politica-de-privacidad');
DELETE FROM cms_page
WHERE cms_page_id NOT IN (SELECT cms_page_description_cms_page_id FROM cms_page_description);

-- Helper: wraps an EditorJS blocks array into a single Row[] column
-- Row format: [{id, size:12, columns:[{id, size:12, data:{blocks:[]}}]}]

-- ============================================================
-- 1. Términos y Condiciones
-- ============================================================
DO $$
DECLARE v_page_id INT;
BEGIN
INSERT INTO cms_page (status) VALUES (true) RETURNING cms_page_id INTO v_page_id;
INSERT INTO cms_page_description (
  cms_page_description_cms_page_id, url_key, name,
  meta_title, meta_description, content
) VALUES (
  v_page_id,
  'terminos-y-condiciones',
  'Términos y Condiciones',
  'Términos y Condiciones — SafeStep Corp',
  'Términos y condiciones de uso y compra en SafeStep Corp.',
  '[{"id":"tc-row","size":12,"columns":[{"id":"tc-col","size":12,"data":{"time":1750000000000,"blocks":[{"id":"tc-h1","type":"header","data":{"text":"Términos y Condiciones","level":1}},{"id":"tc-p0","type":"paragraph","data":{"text":"Bienvenido a <b>SafeStep Corp</b>. Al acceder y utilizar este sitio, aceptas los siguientes términos y condiciones."}},{"id":"tc-h2","type":"header","data":{"text":"1. Información General","level":2}},{"id":"tc-p1","type":"paragraph","data":{"text":"SafeStep Corp es una empresa dedicada a la fabricación y comercialización de calzado de seguridad industrial certificado bajo la norma <b>NOM-113-STPS-2009</b> e <b>ISO 20345:2011</b>."}},{"id":"tc-h3","type":"header","data":{"text":"2. Uso del Sitio Web","level":2}},{"id":"tc-p2","type":"paragraph","data":{"text":"Al utilizar este sitio declaras ser mayor de 18 años y tener capacidad legal para celebrar contratos. Queda prohibido el uso del sitio para fines ilegales o fraudulentos."}},{"id":"tc-h4","type":"header","data":{"text":"3. Productos y Precios","level":2}},{"id":"tc-p3","type":"paragraph","data":{"text":"Los precios están expresados en dólares americanos (USD) e incluyen los impuestos vigentes, salvo indicación contraria. SafeStep Corp se reserva el derecho de modificar precios sin previo aviso."}},{"id":"tc-h5","type":"header","data":{"text":"4. Proceso de Compra","level":2}},{"id":"tc-p4","type":"paragraph","data":{"text":"Al confirmar un pedido recibirás un correo con el resumen y número de orden. La confirmación constituye un contrato de compraventa entre el cliente y SafeStep Corp."}},{"id":"tc-h6","type":"header","data":{"text":"5. Métodos de Pago","level":2}},{"id":"tc-p5","type":"paragraph","data":{"text":"Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express) y PayPal. Todos los pagos se procesan mediante plataformas seguras con cifrado SSL. SafeStep Corp no almacena datos de tarjetas."}},{"id":"tc-h7","type":"header","data":{"text":"6. Envíos y Entregas","level":2}},{"id":"tc-p6","type":"paragraph","data":{"text":"Realizamos envíos a todo Estados Unidos y a nivel internacional. El tiempo estimado de entrega es de 3 a 7 días hábiles. Los pedidos mayores a $75 USD tienen envío gratuito."}},{"id":"tc-h8","type":"header","data":{"text":"7. Devoluciones y Garantía","level":2}},{"id":"tc-p7","type":"paragraph","data":{"text":"Todos nuestros productos cuentan con <b>garantía de 6 meses</b> por defectos de fabricación. Para devoluciones por cambio de opinión tienes 30 días naturales desde la recepción, siempre que el producto esté en su empaque original sin uso."}},{"id":"tc-h9","type":"header","data":{"text":"8. Propiedad Intelectual","level":2}},{"id":"tc-p8","type":"paragraph","data":{"text":"Todo el contenido del sitio —textos, imágenes, logotipos y diseños— es propiedad exclusiva de SafeStep Corp. Queda prohibida su reproducción sin autorización escrita."}},{"id":"tc-h10","type":"header","data":{"text":"9. Ley Aplicable","level":2}},{"id":"tc-p9","type":"paragraph","data":{"text":"Estos términos se rigen por las leyes del Estado de Florida, Estados Unidos. Para cualquier controversia, las partes se someten a los tribunales competentes de Miami-Dade County."}},{"id":"tc-h11","type":"header","data":{"text":"10. Modificaciones","level":2}},{"id":"tc-p10","type":"paragraph","data":{"text":"SafeStep Corp puede modificar estos términos en cualquier momento. Los cambios entran en vigor al publicarse. El uso continuado del sitio implica la aceptación de los nuevos términos."}},{"id":"tc-foot","type":"paragraph","data":{"text":"<b>Última actualización:</b> Junio 2025. Contacto: <b>legal@safestep.com</b>"}}],"version":"2.26.5"}}]}]'
);
END $$;

-- ============================================================
-- 2. Política de Privacidad
-- ============================================================
DO $$
DECLARE v_page_id INT;
BEGIN
INSERT INTO cms_page (status) VALUES (true) RETURNING cms_page_id INTO v_page_id;
INSERT INTO cms_page_description (
  cms_page_description_cms_page_id, url_key, name,
  meta_title, meta_description, content
) VALUES (
  v_page_id,
  'politica-de-privacidad',
  'Política de Privacidad',
  'Política de Privacidad — SafeStep Corp',
  'Cómo SafeStep Corp recopila, usa y protege tus datos personales.',
  '[{"id":"pp-row","size":12,"columns":[{"id":"pp-col","size":12,"data":{"time":1750000000000,"blocks":[{"id":"pp-h1","type":"header","data":{"text":"Política de Privacidad","level":1}},{"id":"pp-p0","type":"paragraph","data":{"text":"<b>SafeStep Corp</b> tiene como prioridad la protección de tus datos personales. Este Aviso de Privacidad cumple con las leyes de privacidad del Estado de Florida y regulaciones federales aplicables en EE. UU."}},{"id":"pp-h2","type":"header","data":{"text":"1. Responsable del Tratamiento","level":2}},{"id":"pp-p1","type":"paragraph","data":{"text":"<b>SafeStep Corp</b>, con domicilio en 8603 NW 54th Street, Doral, FL 33166, EE. UU., es el responsable del tratamiento de tus datos. Contacto: <b>privacidad@safestep.com</b>"}},{"id":"pp-h3","type":"header","data":{"text":"2. Datos que Recopilamos","level":2}},{"id":"pp-l1","type":"list","data":{"style":"unordered","items":["<b>Identificación:</b> nombre completo, correo electrónico, teléfono.","<b>Envío:</b> dirección, ciudad, estado, código postal.","<b>Pago:</b> procesado por terceros certificados PCI-DSS (no almacenamos datos de tarjeta).","<b>Navegación:</b> IP, tipo de navegador, páginas visitadas (mediante cookies)."]}},{"id":"pp-h4","type":"header","data":{"text":"3. Finalidades","level":2}},{"id":"pp-p2","type":"paragraph","data":{"text":"<b>Primarias (necesarias):</b> procesar pedidos, coordinar envíos, emitir facturas, atender garantías y soporte al cliente."}},{"id":"pp-p3","type":"paragraph","data":{"text":"<b>Secundarias (puedes oponerte):</b> envío de promociones, encuestas de satisfacción y análisis estadístico."}},{"id":"pp-h5","type":"header","data":{"text":"4. Transferencia de Datos","level":2}},{"id":"pp-p4","type":"paragraph","data":{"text":"Compartimos datos únicamente con empresas de mensajería para gestionar envíos y procesadores de pago certificados. No vendemos ni cedemos tus datos a terceros con fines comerciales."}},{"id":"pp-h6","type":"header","data":{"text":"5. Cookies","level":2}},{"id":"pp-p5","type":"paragraph","data":{"text":"Usamos cookies propias y de terceros para mejorar la experiencia. Puedes configurar tu navegador para rechazarlas, aunque algunas funciones del sitio podrían verse afectadas."}},{"id":"pp-h7","type":"header","data":{"text":"6. Tus Derechos","level":2}},{"id":"pp-p6","type":"paragraph","data":{"text":"Tienes derecho a acceder, rectificar, eliminar u oponerte al uso de tus datos. Envía tu solicitud a <b>privacidad@safestep.com</b> con tu nombre, correo registrado y copia de identificación. Responderemos en un plazo máximo de 30 días."}},{"id":"pp-h8","type":"header","data":{"text":"7. Seguridad","level":2}},{"id":"pp-p7","type":"paragraph","data":{"text":"Implementamos medidas técnicas y administrativas para proteger tus datos. Toda transmisión en el sitio usa cifrado SSL/TLS."}},{"id":"pp-h9","type":"header","data":{"text":"8. Retención","level":2}},{"id":"pp-p8","type":"paragraph","data":{"text":"Conservamos tus datos durante el tiempo necesario para cumplir las finalidades descritas y las obligaciones legales aplicables (mínimo 5 años para datos de facturación)."}},{"id":"pp-h10","type":"header","data":{"text":"9. Cambios a este Aviso","level":2}},{"id":"pp-p9","type":"paragraph","data":{"text":"Podemos actualizar esta política en cualquier momento. Los cambios se publican en esta página con la fecha de actualización."}},{"id":"pp-foot","type":"paragraph","data":{"text":"<b>Última actualización:</b> Junio 2025. Para consultas: <b>privacidad@safestep.com</b>"}}],"version":"2.26.5"}}]}]'
);
END $$;

COMMIT;

SELECT name, url_key, status FROM cms_page cp
JOIN cms_page_description cpd ON cpd.cms_page_description_cms_page_id = cp.cms_page_id
WHERE url_key IN ('terminos-y-condiciones', 'politica-de-privacidad');
