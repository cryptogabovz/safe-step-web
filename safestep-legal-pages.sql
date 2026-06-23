-- ============================================================
-- SAFE STEP — Páginas Legales
-- Términos y Condiciones + Política de Privacidad
-- ============================================================
BEGIN;

-- Limpia páginas previas para reimport idempotente
DELETE FROM cms_page_description
WHERE url_key IN ('terminos-y-condiciones', 'politica-de-privacidad');

DELETE FROM cms_page
WHERE cms_page_id NOT IN (
  SELECT cms_page_description_cms_page_id FROM cms_page_description
);

-- ============================================================
-- 1. Términos y Condiciones
-- ============================================================
DO $$
DECLARE
  v_page_id INT;
BEGIN

INSERT INTO cms_page (status)
VALUES (true)
RETURNING cms_page_id INTO v_page_id;

INSERT INTO cms_page_description (
  cms_page_description_cms_page_id,
  url_key,
  name,
  meta_title,
  meta_description,
  content
) VALUES (
  v_page_id,
  'terminos-y-condiciones',
  'Términos y Condiciones',
  'Términos y Condiciones — SafeStep Corp',
  'Conoce los términos y condiciones de uso del sitio web y de compra de productos SafeStep Corp.',
  '{
    "time": 1750000000000,
    "blocks": [
      {
        "id": "tc-h1",
        "type": "header",
        "data": { "text": "Términos y Condiciones", "level": 1 }
      },
      {
        "id": "tc-intro",
        "type": "paragraph",
        "data": { "text": "Bienvenido al sitio web de <b>SafeStep Corp</b>. Al acceder y utilizar este sitio, aceptas los siguientes términos y condiciones. Te recomendamos leerlos detenidamente antes de realizar cualquier compra o uso de nuestros servicios." }
      },
      {
        "id": "tc-h2-1",
        "type": "header",
        "data": { "text": "1. Información General", "level": 2 }
      },
      {
        "id": "tc-p1",
        "type": "paragraph",
        "data": { "text": "<b>SafeStep Corp</b> es una empresa dedicada a la fabricación y comercialización de calzado de seguridad industrial certificado. Nuestros productos cumplen con la Norma Oficial Mexicana <b>NOM-113-STPS-2009</b> y la norma internacional <b>ISO 20345:2011</b>." }
      },
      {
        "id": "tc-h2-2",
        "type": "header",
        "data": { "text": "2. Uso del Sitio Web", "level": 2 }
      },
      {
        "id": "tc-p2",
        "type": "paragraph",
        "data": { "text": "Al utilizar este sitio web, declaras que eres mayor de 18 años y tienes capacidad legal para celebrar contratos. Queda prohibido el uso del sitio para fines ilegales, fraudulentos o que infrinjan derechos de terceros." }
      },
      {
        "id": "tc-h2-3",
        "type": "header",
        "data": { "text": "3. Productos y Precios", "level": 2 }
      },
      {
        "id": "tc-p3",
        "type": "paragraph",
        "data": { "text": "Todos los precios publicados en el sitio están expresados en pesos mexicanos (MXN) e incluyen el Impuesto al Valor Agregado (IVA) vigente, salvo indicación contraria. SafeStep Corp se reserva el derecho de modificar precios sin previo aviso. El precio aplicable será el vigente al momento de confirmar el pedido." }
      },
      {
        "id": "tc-h2-4",
        "type": "header",
        "data": { "text": "4. Proceso de Compra", "level": 2 }
      },
      {
        "id": "tc-p4",
        "type": "paragraph",
        "data": { "text": "Para realizar una compra deberás seleccionar los productos, agregarlos al carrito y completar el proceso de pago. Una vez confirmado tu pedido recibirás un correo electrónico con el resumen y número de orden. La confirmación del pedido constituye la celebración de un contrato de compraventa." }
      },
      {
        "id": "tc-h2-5",
        "type": "header",
        "data": { "text": "5. Métodos de Pago", "level": 2 }
      },
      {
        "id": "tc-p5",
        "type": "paragraph",
        "data": { "text": "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencia bancaria y PayPal. Todos los pagos se procesan a través de plataformas seguras con cifrado SSL. SafeStep Corp no almacena datos de tarjetas de crédito." }
      },
      {
        "id": "tc-h2-6",
        "type": "header",
        "data": { "text": "6. Envíos y Entregas", "level": 2 }
      },
      {
        "id": "tc-p6",
        "type": "paragraph",
        "data": { "text": "Realizamos envíos a toda la República Mexicana. El tiempo estimado de entrega es de 3 a 7 días hábiles dependiendo de la ubicación. Los pedidos mayores a $1,500 MXN tienen envío gratuito. SafeStep Corp no se hace responsable por retrasos ocasionados por la empresa de paquetería o por causas de fuerza mayor." }
      },
      {
        "id": "tc-h2-7",
        "type": "header",
        "data": { "text": "7. Devoluciones y Garantía", "level": 2 }
      },
      {
        "id": "tc-p7",
        "type": "paragraph",
        "data": { "text": "Todos nuestros productos cuentan con <b>garantía de 6 meses</b> por defectos de fabricación. Si el producto presenta algún defecto, podrás solicitar su reemplazo o devolución dentro del plazo de garantía. Para devoluciones por cambio de opinión tienes un plazo de 30 días naturales desde la recepción, siempre que el producto se encuentre en su empaque original, sin uso y con todas las etiquetas." }
      },
      {
        "id": "tc-h2-8",
        "type": "header",
        "data": { "text": "8. Propiedad Intelectual", "level": 2 }
      },
      {
        "id": "tc-p8",
        "type": "paragraph",
        "data": { "text": "Todo el contenido de este sitio web — incluyendo textos, imágenes, logotipos, diseños y marcas — es propiedad exclusiva de SafeStep Corp o de sus licenciantes y está protegido por las leyes de propiedad intelectual vigentes. Queda prohibida su reproducción total o parcial sin autorización expresa por escrito." }
      },
      {
        "id": "tc-h2-9",
        "type": "header",
        "data": { "text": "9. Limitación de Responsabilidad", "level": 2 }
      },
      {
        "id": "tc-p9",
        "type": "paragraph",
        "data": { "text": "SafeStep Corp no será responsable por daños indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso del sitio web o de los productos adquiridos, más allá de lo permitido por la legislación mexicana aplicable." }
      },
      {
        "id": "tc-h2-10",
        "type": "header",
        "data": { "text": "10. Ley Aplicable y Jurisdicción", "level": 2 }
      },
      {
        "id": "tc-p10",
        "type": "paragraph",
        "data": { "text": "Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia derivada de su interpretación o cumplimiento, las partes se someten a la jurisdicción de los tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles." }
      },
      {
        "id": "tc-h2-11",
        "type": "header",
        "data": { "text": "11. Modificaciones", "level": 2 }
      },
      {
        "id": "tc-p11",
        "type": "paragraph",
        "data": { "text": "SafeStep Corp se reserva el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor en el momento de su publicación en el sitio. El uso continuado del sitio después de dicha publicación constituye la aceptación de los nuevos términos." }
      },
      {
        "id": "tc-contact",
        "type": "paragraph",
        "data": { "text": "<b>Última actualización:</b> Junio 2025. Para cualquier consulta sobre estos términos puedes contactarnos en <b>contacto@safestep.com.mx</b>." }
      }
    ],
    "version": "2.26.5"
  }'
);

END $$;

-- ============================================================
-- 2. Política de Privacidad
-- ============================================================
DO $$
DECLARE
  v_page_id INT;
BEGIN

INSERT INTO cms_page (status)
VALUES (true)
RETURNING cms_page_id INTO v_page_id;

INSERT INTO cms_page_description (
  cms_page_description_cms_page_id,
  url_key,
  name,
  meta_title,
  meta_description,
  content
) VALUES (
  v_page_id,
  'politica-de-privacidad',
  'Política de Privacidad',
  'Política de Privacidad — SafeStep Corp',
  'Conoce cómo SafeStep Corp recopila, usa y protege tus datos personales conforme a la LFPDPPP.',
  '{
    "time": 1750000000000,
    "blocks": [
      {
        "id": "pp-h1",
        "type": "header",
        "data": { "text": "Política de Privacidad", "level": 1 }
      },
      {
        "id": "pp-intro",
        "type": "paragraph",
        "data": { "text": "<b>SafeStep Corp</b> (en adelante \"SafeStep\") tiene como prioridad la protección de tus datos personales. El presente Aviso de Privacidad es elaborado en cumplimiento de la <b>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</b> y su Reglamento." }
      },
      {
        "id": "pp-h2-1",
        "type": "header",
        "data": { "text": "1. Responsable del Tratamiento", "level": 2 }
      },
      {
        "id": "pp-p1",
        "type": "paragraph",
        "data": { "text": "<b>SafeStep Corp</b>, con domicilio en la República Mexicana, es el responsable del tratamiento de tus datos personales. Para cualquier consulta o solicitud relacionada con el tratamiento de tus datos puedes contactarnos en: <b>privacidad@safestep.com.mx</b>." }
      },
      {
        "id": "pp-h2-2",
        "type": "header",
        "data": { "text": "2. Datos Personales que Recopilamos", "level": 2 }
      },
      {
        "id": "pp-p2",
        "type": "paragraph",
        "data": { "text": "Para la prestación de nuestros servicios podemos recopilar los siguientes datos personales:" }
      },
      {
        "id": "pp-list1",
        "type": "list",
        "data": {
          "style": "unordered",
          "items": [
            "<b>Datos de identificación:</b> nombre completo, correo electrónico, número de teléfono.",
            "<b>Datos de envío:</b> domicilio, ciudad, estado, código postal.",
            "<b>Datos de pago:</b> procesados de forma segura por terceros certificados (nunca almacenamos datos de tarjeta).",
            "<b>Datos de navegación:</b> dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia (mediante cookies).",
            "<b>Datos empresariales:</b> nombre de empresa y RFC cuando aplique (para cotizaciones y facturación)."
          ]
        }
      },
      {
        "id": "pp-h2-3",
        "type": "header",
        "data": { "text": "3. Finalidades del Tratamiento", "level": 2 }
      },
      {
        "id": "pp-p3",
        "type": "paragraph",
        "data": { "text": "Tus datos personales serán utilizados para las siguientes finalidades <b>primarias</b> (necesarias para la prestación del servicio):" }
      },
      {
        "id": "pp-list2",
        "type": "list",
        "data": {
          "style": "unordered",
          "items": [
            "Procesar y gestionar tus pedidos y pagos.",
            "Coordinar la entrega de productos al domicilio indicado.",
            "Emitir facturas y comprobantes fiscales.",
            "Atender consultas, quejas y solicitudes de garantía.",
            "Crear y administrar tu cuenta de usuario."
          ]
        }
      },
      {
        "id": "pp-p3b",
        "type": "paragraph",
        "data": { "text": "Finalidades <b>secundarias</b> (puedes oponerte a ellas):" }
      },
      {
        "id": "pp-list3",
        "type": "list",
        "data": {
          "style": "unordered",
          "items": [
            "Envío de boletines, promociones y novedades de SafeStep.",
            "Realización de encuestas de satisfacción.",
            "Análisis estadístico del comportamiento de compra."
          ]
        }
      },
      {
        "id": "pp-h2-4",
        "type": "header",
        "data": { "text": "4. Transferencia de Datos", "level": 2 }
      },
      {
        "id": "pp-p4",
        "type": "paragraph",
        "data": { "text": "SafeStep podrá compartir tus datos con terceros únicamente cuando sea necesario para cumplir las finalidades primarias descritas: empresas de paquetería para gestionar envíos, procesadores de pago certificados PCI-DSS, y autoridades fiscales cuando lo exija la ley. No vendemos ni cedemos tus datos a terceros con fines comerciales." }
      },
      {
        "id": "pp-h2-5",
        "type": "header",
        "data": { "text": "5. Cookies y Tecnologías de Rastreo", "level": 2 }
      },
      {
        "id": "pp-p5",
        "type": "paragraph",
        "data": { "text": "Nuestro sitio utiliza cookies propias y de terceros para mejorar tu experiencia de navegación, analizar el tráfico y personalizar contenido. Puedes configurar tu navegador para rechazar cookies, aunque esto podría afectar el funcionamiento del sitio. Al continuar navegando consientes el uso de cookies." }
      },
      {
        "id": "pp-h2-6",
        "type": "header",
        "data": { "text": "6. Derechos ARCO", "level": 2 }
      },
      {
        "id": "pp-p6",
        "type": "paragraph",
        "data": { "text": "Conforme a la LFPDPPP tienes derecho a <b>Acceder, Rectificar, Cancelar u Oponerte</b> (derechos ARCO) al tratamiento de tus datos personales. Para ejercer estos derechos envía tu solicitud a <b>privacidad@safestep.com.mx</b> con:" }
      },
      {
        "id": "pp-list4",
        "type": "list",
        "data": {
          "style": "unordered",
          "items": [
            "Nombre completo y correo electrónico registrado.",
            "Descripción clara del derecho que deseas ejercer.",
            "Copia de identificación oficial vigente."
          ]
        }
      },
      {
        "id": "pp-p6b",
        "type": "paragraph",
        "data": { "text": "Responderemos tu solicitud en un plazo máximo de <b>20 días hábiles</b> contados a partir de su recepción." }
      },
      {
        "id": "pp-h2-7",
        "type": "header",
        "data": { "text": "7. Seguridad de los Datos", "level": 2 }
      },
      {
        "id": "pp-p7",
        "type": "paragraph",
        "data": { "text": "SafeStep implementa medidas de seguridad técnicas, administrativas y físicas para proteger tus datos personales contra pérdida, uso no autorizado, acceso indebido, divulgación, alteración o destrucción. Toda la transmisión de datos en nuestro sitio se realiza mediante cifrado SSL/TLS." }
      },
      {
        "id": "pp-h2-8",
        "type": "header",
        "data": { "text": "8. Retención de Datos", "level": 2 }
      },
      {
        "id": "pp-p8",
        "type": "paragraph",
        "data": { "text": "Conservaremos tus datos personales durante el tiempo necesario para cumplir las finalidades descritas y para atender obligaciones legales y fiscales (hasta 5 años en el caso de datos de facturación, conforme al Código Fiscal de la Federación)." }
      },
      {
        "id": "pp-h2-9",
        "type": "header",
        "data": { "text": "9. Cambios a este Aviso", "level": 2 }
      },
      {
        "id": "pp-p9",
        "type": "paragraph",
        "data": { "text": "SafeStep se reserva el derecho de modificar este Aviso de Privacidad en cualquier momento. Cualquier modificación será publicada en esta página con la fecha de actualización correspondiente. El uso continuado del sitio implica la aceptación de los cambios." }
      },
      {
        "id": "pp-contact",
        "type": "paragraph",
        "data": { "text": "<b>Última actualización:</b> Junio 2025. Para consultas sobre privacidad: <b>privacidad@safestep.com.mx</b>." }
      }
    ],
    "version": "2.26.5"
  }'
);

END $$;

COMMIT;

-- Verificación
SELECT name, url_key, status FROM cms_page cp
JOIN cms_page_description cpd ON cpd.cms_page_description_cms_page_id = cp.cms_page_id
WHERE url_key IN ('terminos-y-condiciones', 'politica-de-privacidad');
