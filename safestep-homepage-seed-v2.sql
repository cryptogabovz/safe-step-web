-- ============================================================
-- SAFE STEP — Seed v3: solo header + footer widgets
-- El homepage content se renderiza desde SafeStepHome.tsx
-- ============================================================
BEGIN;

DELETE FROM widget_placement
WHERE widget_instance_id IN (
  SELECT widget_instance_id FROM widget_instance WHERE name LIKE 'SafeStep -%'
);
DELETE FROM widget_instance WHERE name LIKE 'SafeStep -%';

DO $$
DECLARE wid INT;
BEGIN

-- ============================================================
-- 1. Announcement Bar — headerTop
-- ============================================================
INSERT INTO widget_instance (name, type, settings, status) VALUES (
  'SafeStep - Barra de Anuncios', 'announcement_bar',
  '{
    "backgroundColor": "#187772",
    "textColor": "#ffffff",
    "delay": 5000,
    "announcements": [
      {"id":"a-1","content":"Calzado de Seguridad Industrial Certificado — Envíos a todo el País","link":null},
      {"id":"a-2","content":"NOM-113-STPS · ISO 20345:2011 · Punta de Acero · Anti-Estático · Resistente al Agua","link":null},
      {"id":"a-3","content":"¿Necesitas cotización empresarial? ¡Escríbenos hoy!","link":{"url":"/","label":"Cotizar","newTab":false}}
    ]
  }'::jsonb, true
) RETURNING widget_instance_id INTO wid;
INSERT INTO widget_placement (widget_instance_id, route, area, sort_order) VALUES (wid, 'all', 'headerTop', 10);

-- ============================================================
-- 2. Main Menu — headerMiddleCenter
-- ============================================================
INSERT INTO widget_instance (name, type, settings, status) VALUES (
  'SafeStep - Menú Principal', 'basic_menu',
  '{
    "isMain": true,
    "menus": [
      {"id":"m-1","name":"Inicio","url":"/","type":"custom","children":[]},
      {"id":"m-2","name":"Productos","url":"/catalog","type":"custom","children":[
        {"id":"m-2-1","name":"Botas Punta de Acero","url":"/catalog","type":"custom"},
        {"id":"m-2-2","name":"Ver Catálogo","url":"/catalog","type":"custom"}
      ]},
      {"id":"m-3","name":"Nosotros","url":"/nosotros","type":"custom","children":[]},
      {"id":"m-4","name":"Contacto","url":"/contacto","type":"custom","children":[]}
    ]
  }'::jsonb, true
) RETURNING widget_instance_id INTO wid;
INSERT INTO widget_placement (widget_instance_id, route, area, sort_order) VALUES (wid, 'all', 'headerMiddleCenter', 10);

-- ============================================================
-- 3. Footer Menu — footerTop
-- ============================================================
INSERT INTO widget_instance (name, type, settings, status) VALUES (
  'SafeStep - Footer Menú', 'footer_menu',
  '{
    "columns": [
      {"id":"fc-1","title":"Productos","links":[
        {"id":"fl-1-1","label":"Botas Punta de Acero","url":"/catalog"},
        {"id":"fl-1-2","label":"Ver Catálogo","url":"/catalog"}
      ]},
      {"id":"fc-2","title":"Empresa","links":[
        {"id":"fl-2-1","label":"Nosotros","url":"/"},
        {"id":"fl-2-2","label":"Certificaciones","url":"/"}
      ]},
      {"id":"fc-3","title":"Soporte","links":[
        {"id":"fl-3-1","label":"Cotización Empresarial","url":"/"},
        {"id":"fl-3-2","label":"Seguimiento de Pedido","url":"/customer/order"},
        {"id":"fl-3-3","label":"Contacto","url":"/"}
      ]},
      {"id":"fc-4","title":"Legal","links":[
        {"id":"fl-4-1","label":"Términos y Condiciones","url":"/page/terminos-y-condiciones"},
        {"id":"fl-4-2","label":"Política de Privacidad","url":"/page/politica-de-privacidad"}
      ]}
    ]
  }'::jsonb, true
) RETURNING widget_instance_id INTO wid;
INSERT INTO widget_placement (widget_instance_id, route, area, sort_order) VALUES (wid, 'all', 'footerTop', 10);

-- ============================================================
-- 4. Footer Contact — footerMiddleLeft
-- ============================================================
INSERT INTO widget_instance (name, type, settings, status) VALUES (
  'SafeStep - Contacto Footer', 'text_block',
  jsonb_build_object(
    'className', 'safestep-footer-contact',
    'text', '[{"size":12,"columns":[{"size":12,"data":{"blocks":[{"type":"raw","data":{"html":"<p style=\"margin:0 0 2px;font-size:0.8rem;line-height:1.5;color:#9ca3af\"><strong style=\"color:#d1d5db\">SafeStep Corp<\/strong><br>8603 NW 54th Street, Doral FL 33166<br>contacto@safestep.com<\/p>"}}]}}]}]'
  ), true
) RETURNING widget_instance_id INTO wid;
INSERT INTO widget_placement (widget_instance_id, route, area, sort_order) VALUES (wid, 'all', 'footerMiddleLeft', 10);

END $$;

COMMIT;

SELECT wi.name, wi.type, wp.route, wp.area, wp.sort_order
FROM widget_instance wi
JOIN widget_placement wp ON wi.widget_instance_id = wp.widget_instance_id
WHERE wi.name LIKE 'SafeStep -%'
ORDER BY wp.route, wp.area, wp.sort_order;
