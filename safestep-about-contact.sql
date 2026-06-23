-- ============================================================
-- SAFE STEP — Páginas Nosotros y Contacto
-- ============================================================
BEGIN;

DELETE FROM cms_page_description
WHERE url_key IN ('nosotros', 'contacto');
DELETE FROM cms_page
WHERE cms_page_id NOT IN (SELECT cms_page_description_cms_page_id FROM cms_page_description);

-- ============================================================
-- 1. Nosotros
-- ============================================================
DO $$
DECLARE v_page_id INT;
BEGIN
INSERT INTO cms_page (status) VALUES (true) RETURNING cms_page_id INTO v_page_id;
INSERT INTO cms_page_description (
  cms_page_description_cms_page_id, url_key, name,
  meta_title, meta_description, content
) VALUES (
  v_page_id, 'nosotros', 'Nosotros',
  'Nosotros — SafeStep Corp',
  'Conoce la historia, misión y valores de SafeStep Corp, líder en calzado de seguridad industrial.',
  '[{"id":"r1","size":12,"columns":[{"id":"c1","size":12,"data":{"blocks":[
    {"id":"h1","type":"header","data":{"text":"Quiénes Somos","level":1}},
    {"id":"p1","type":"paragraph","data":{"text":"<b>SafeStep Corp</b> es una empresa especializada en la fabricación y distribución de calzado de seguridad industrial de alta calidad. Fundada con la misión de proteger a quienes más lo necesitan, hemos crecido hasta convertirnos en un referente del sector en América Latina."}},
    {"id":"h2","type":"header","data":{"text":"Nuestra Misión","level":2}},
    {"id":"p2","type":"paragraph","data":{"text":"Fabricar calzado de seguridad que realmente proteja. No solo cumplir normas, sino superarlas. Cada bota que sale de nuestras instalaciones ha pasado pruebas rigurosas de impacto, compresión, perforación y resistencia química para garantizar que quien la usa llegue sano a casa cada día."}},
    {"id":"h3","type":"header","data":{"text":"Nuestra Visión","level":2}},
    {"id":"p3","type":"paragraph","data":{"text":"Ser la marca de referencia en calzado de seguridad industrial en todo el continente americano, reconocida por la calidad, innovación y compromiso con la seguridad de los trabajadores."}},
    {"id":"h4","type":"header","data":{"text":"Nuestros Valores","level":2}},
    {"id":"l1","type":"list","data":{"style":"unordered","items":["<b>Seguridad primero:</b> cada decisión de diseño parte de la protección del trabajador.","<b>Calidad sin concesiones:</b> materiales premium, procesos rigurosos y control continuo.","<b>Innovación constante:</b> investigamos nuevas tecnologías para mejorar cada generación de producto.","<b>Responsabilidad:</b> con nuestros clientes, proveedores, trabajadores y el medio ambiente."]}},
    {"id":"h5","type":"header","data":{"text":"Certificaciones","level":2}},
    {"id":"p4","type":"paragraph","data":{"text":"Todo nuestro calzado cumple con los estándares más exigentes del mercado:"}},
    {"id":"l2","type":"list","data":{"style":"unordered","items":["<b>NOM-113-STPS-2009</b> — Norma Oficial Mexicana para calzado de protección","<b>ISO 20345:2011</b> — Norma internacional de seguridad básica (200 J en puntera)","Resistencia a la penetración plantar, anti-deslizante, anti-estático y resistente al agua"]}},
    {"id":"h6","type":"header","data":{"text":"Dónde Estamos","level":2}},
    {"id":"p5","type":"paragraph","data":{"text":"Nuestras oficinas principales se encuentran en <b>8603 NW 54th Street, Doral, FL 33166, EE. UU.</b>, con cobertura de distribución a México, Centroamérica y el resto de América Latina. Si deseas conocer más sobre nuestros productos o establecer una alianza comercial, escríbenos a <b>contacto@safestep.com</b>."}}
  ]}}]}]'
);
END $$;

-- ============================================================
-- 2. Contacto
-- ============================================================
DO $$
DECLARE v_page_id INT;
BEGIN
INSERT INTO cms_page (status) VALUES (true) RETURNING cms_page_id INTO v_page_id;
INSERT INTO cms_page_description (
  cms_page_description_cms_page_id, url_key, name,
  meta_title, meta_description, content
) VALUES (
  v_page_id, 'contacto', 'Contacto',
  'Contacto — SafeStep Corp',
  'Contáctanos para cotizaciones, soporte técnico o cualquier consulta sobre nuestro calzado de seguridad industrial.',
  '[{"id":"r1","size":12,"columns":[{"id":"c1","size":12,"data":{"blocks":[
    {"id":"h1","type":"header","data":{"text":"Contáctanos","level":1}},
    {"id":"p1","type":"paragraph","data":{"text":"Estamos aquí para ayudarte. Ya sea que busques una cotización para tu empresa, tengas dudas sobre algún producto o necesites soporte posventa, nuestro equipo responderá en menos de 24 horas hábiles."}},
    {"id":"h2","type":"header","data":{"text":"Información de Contacto","level":2}},
    {"id":"l1","type":"list","data":{"style":"unordered","items":["📧 <b>Email general:</b> contacto@safestep.com","📧 <b>Cotizaciones empresariales:</b> ventas@safestep.com","📧 <b>Soporte técnico y garantías:</b> soporte@safestep.com","🏢 <b>Dirección:</b> 8603 NW 54th Street, Doral, FL 33166, EE. UU."]}},
    {"id":"h3","type":"header","data":{"text":"Cotizaciones Empresariales","level":2}},
    {"id":"p2","type":"paragraph","data":{"text":"Si representas a una empresa y necesitas calzado de seguridad para tu equipo, contáctanos indicando:"}},
    {"id":"l2","type":"list","data":{"style":"ordered","items":["Nombre de la empresa y giro industrial","Cantidad aproximada de pares requeridos","Tallas y modelos de interés","País y ciudad de entrega"]}},
    {"id":"p3","type":"paragraph","data":{"text":"Con esta información preparamos una propuesta personalizada con precios de mayoreo, tiempos de entrega y opciones de crédito."}},
    {"id":"h4","type":"header","data":{"text":"Horario de Atención","level":2}},
    {"id":"p4","type":"paragraph","data":{"text":"Lunes a viernes de <b>9:00 a 18:00 hrs (EST)</b>. Los correos recibidos fuera de este horario son respondidos el siguiente día hábil."}},
    {"id":"h5","type":"header","data":{"text":"Garantías y Devoluciones","level":2}},
    {"id":"p5","type":"paragraph","data":{"text":"Para solicitudes relacionadas con garantías o devoluciones, escribe a <b>soporte@safestep.com</b> con tu número de orden y una descripción del problema. Nuestro equipo te guiará en el proceso en 1–2 días hábiles."}}
  ]}}]}]'
);
END $$;

COMMIT;

SELECT name, url_key FROM cms_page cp
JOIN cms_page_description cpd ON cpd.cms_page_description_cms_page_id = cp.cms_page_id
WHERE url_key IN ('nosotros', 'contacto');
