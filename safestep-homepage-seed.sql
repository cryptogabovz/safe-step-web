-- ============================================================
-- SAFE STEP — Homepage Seed (compatible con tabla widget v1)
-- ============================================================
BEGIN;

-- ============================================================
-- HEADER GLOBAL (route: ["all"])
-- ============================================================

-- Barra de Anuncios — teal de marca
INSERT INTO widget (name, type, route, area, sort_order, settings, status) VALUES (
  'SafeStep - Barra de Anuncios',
  'announcement_bar',
  '["all"]',
  '["headerTop"]',
  10,
  '{
    "backgroundColor": "#187772",
    "textColor": "#ffffff",
    "delay": 5000,
    "announcements": [
      {"id":"a-1","content":"Calzado de Seguridad Industrial Certificado — Envíos a todo el País","link":null},
      {"id":"a-2","content":"NOM-113-STPS · ISO 20345:2011 · Punta de Acero · Anti-Estático · Resistente al Agua","link":null},
      {"id":"a-3","content":"¿Necesitas cotización empresarial? ¡Escríbenos hoy!","link":{"url":"/contact","label":"Cotizar","newTab":false}}
    ]
  }',
  true
);

-- Menú Principal
INSERT INTO widget (name, type, route, area, sort_order, settings, status) VALUES (
  'SafeStep - Menú Principal',
  'basic_menu',
  '["all"]',
  '["headerBottom"]',
  10,
  '{
    "isMain": true,
    "menus": [
      {"id":"m-1","title":"Inicio","url":"/","items":[]},
      {"id":"m-2","title":"Productos","url":"/catalog","items":[
        {"id":"m-2-1","title":"Botas Punta de Acero","url":"/catalog"},
        {"id":"m-2-2","title":"Ver Todo","url":"/catalog"}
      ]},
      {"id":"m-3","title":"Nosotros","url":"/","items":[]},
      {"id":"m-4","title":"Contacto","url":"/","items":[]}
    ]
  }',
  true
);

-- ============================================================
-- FOOTER GLOBAL (route: ["all"])
-- ============================================================

INSERT INTO widget (name, type, route, area, sort_order, settings, status) VALUES (
  'SafeStep - Footer Menú',
  'footer_menu',
  '["all"]',
  '["footer"]',
  10,
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
      ]}
    ]
  }',
  true
);

-- ============================================================
-- HOMEPAGE (route: ["homepage"])
-- ============================================================

-- 1. Hero Slideshow
INSERT INTO widget (name, type, route, area, sort_order, settings, status) VALUES (
  'SafeStep - Hero Slideshow',
  'simple_slider',
  '["homepage"]',
  '["content"]',
  10,
  '{
    "autoplay": true,
    "autoplaySpeed": 5500,
    "arrows": true,
    "dots": true,
    "arrowsStyle": "sides",
    "dotsStyle": "bars",
    "transition": "fade",
    "transitionSpeed": 700,
    "aspectRatio": "21:9",
    "defaultContentPosition": "ml",
    "defaultOverlayTint": "gradient",
    "defaultOverlayOpacity": 0.65,
    "slides": [
      {
        "id":"slide-1",
        "image":"/media/safestep/bota-frente.png",
        "width":800,"height":900,
        "eyebrow":"PROTECCIÓN CERTIFICADA",
        "headline":"Tu Seguridad, Nuestro Compromiso",
        "subText":"Calzado de seguridad industrial que cumple los más altos estándares de protección.",
        "buttonText":"Ver Catálogo","buttonLink":"/catalog","buttonStyle":"default",
        "button2Text":"Cotizar Ahora","button2Link":"/","button2Style":"outline",
        "contentPosition":"ml","overlayTint":"gradient","overlayOpacity":0.65,"wholeSlideLink":false,"hidden":false
      },
      {
        "id":"slide-2",
        "image":"/media/safestep/bota-lateral.png",
        "width":800,"height":900,
        "eyebrow":"CALIDAD INDUSTRIAL",
        "headline":"Diseñado para Condiciones Extremas",
        "subText":"Suela anti-deslizante, resistencia al agua y protección eléctrica en un solo calzado.",
        "buttonText":"Ver Modelos","buttonLink":"/catalog","buttonStyle":"default",
        "contentPosition":"ml","overlayTint":"gradient","overlayOpacity":0.6,"wholeSlideLink":false,"hidden":false
      },
      {
        "id":"slide-3",
        "image":"/media/safestep/suela.png",
        "width":500,"height":600,
        "eyebrow":"TECNOLOGÍA DE VANGUARDIA",
        "headline":"Suela que Agarra en Cualquier Superficie",
        "subText":"Diseño ergonómico y materiales de alta resistencia para el trabajador que no se detiene.",
        "buttonText":"Conocer Más","buttonLink":"/catalog","buttonStyle":"default",
        "contentPosition":"ml","overlayTint":"gradient","overlayOpacity":0.6,"wholeSlideLink":false,"hidden":false
      }
    ]
  }',
  true
);

-- 2. Trust Strip — 4 certificaciones
INSERT INTO widget (name, type, route, area, sort_order, settings, status) VALUES (
  'SafeStep - Certificaciones',
  'trust_strip',
  '["homepage"]',
  '["content"]',
  20,
  '{
    "items": [
      {"id":"punta-acero","icon":null,"title":"Punta de Acero","description":"Protección contra impactos de hasta 200 J","link":null},
      {"id":"antideslizante","icon":null,"title":"Anti-Deslizante","description":"Agarre certificado en superficies húmedas y secas","link":null},
      {"id":"resistente-agua","icon":null,"title":"Resistente al Agua","description":"Cuero tratado con membrana hidrofugante","link":null},
      {"id":"antiestatico","icon":null,"title":"Anti-Estático","description":"Disipa cargas eléctricas en zonas de riesgo","link":null}
    ],
    "columns": 4,
    "showIcons": false,
    "iconSize": "lg",
    "alignment": "center",
    "divider": true
  }',
  true
);

-- 3. Banner — strip visual con iconos de certificaciones
INSERT INTO widget (name, type, route, area, sort_order, settings, status) VALUES (
  'SafeStep - Iconos de Seguridad',
  'banner',
  '["homepage"]',
  '["content"]',
  30,
  '{
    "src": "/media/safestep/iconos-certificaciones.png",
    "alignment": "center",
    "width": 1200,
    "height": 160,
    "alt": "Certificaciones Safe Step: Punta de Acero, Anti-Deslizante, Resistente al Agua, Anti-Estático",
    "link": null,
    "eyebrow": null,
    "heading": null,
    "subText": null,
    "contentPosition": "mc",
    "overlayTint": "none",
    "overlayOpacity": 0,
    "cta": null,
    "cta2": null,
    "mobileImage": null,
    "mobileImageWidth": null,
    "mobileImageHeight": null
  }',
  true
);

-- 4. Separador
INSERT INTO widget (name, type, route, area, sort_order, settings, status) VALUES (
  'SafeStep - Separador 1',
  'separator',
  '["homepage"]',
  '["content"]',
  40,
  '{"size":"md","showLine":true,"lineColor":"#e1e3e5"}',
  true
);

-- 5. Productos Destacados
INSERT INTO widget (name, type, route, area, sort_order, settings, status) VALUES (
  'SafeStep - Productos Destacados',
  'collection_products',
  '["homepage"]',
  '["content"]',
  50,
  '{
    "collection": null,
    "count": 4,
    "countPerRow": 4,
    "heading": "Nuestros Modelos Más Vendidos",
    "subText": "Calzado industrial certificado para cada industria y condición de trabajo.",
    "viewAllLink": "/catalog",
    "viewAllLabel": "Ver Catálogo Completo"
  }',
  true
);

-- 6. Separador
INSERT INTO widget (name, type, route, area, sort_order, settings, status) VALUES (
  'SafeStep - Separador 2',
  'separator',
  '["homepage"]',
  '["content"]',
  60,
  '{"size":"lg","showLine":false}',
  true
);

-- 7. Split Feature — bota lateral + argumento de venta
INSERT INTO widget (name, type, route, area, sort_order, settings, status) VALUES (
  'SafeStep - Producto Destacado',
  'split_feature',
  '["homepage"]',
  '["content"]',
  70,
  '{
    "image": "/media/safestep/bota-lateral.png",
    "imageAlt": "Bota de seguridad Safe Step — vista lateral",
    "imagePosition": "right",
    "width": 800,
    "height": 900,
    "eyebrow": "CALIDAD PREMIUM",
    "heading": "Protección que Resiste Todo",
    "body": "Nuestras botas combinan cuero de alta resistencia con tecnología de vanguardia. Plantilla ergonómica, puntera de acero y suela de hule compuesto anti-deslizante.\n\nCertificadas bajo NOM-113-STPS-2009 e ISO 20345:2011. Para construcción, manufactura, minería y más.",
    "cta": {"label":"Ver Todos los Modelos","url":"/catalog","kind":"custom","newTab":false,"style":"primary"},
    "verticalAlign": "center",
    "imageFit": "cover"
  }',
  true
);

-- 8. Bento Grid — categorías con colores de marca
INSERT INTO widget (name, type, route, area, sort_order, settings, status) VALUES (
  'SafeStep - Grilla de Categorías',
  'bento_grid',
  '["homepage"]',
  '["content"]',
  80,
  '{
    "tiles": [
      {
        "id":"bt-1","size":"lg",
        "image":"/media/safestep/bota-frente.png","imageAlt":"Botas con punta de acero","imageWidth":800,"imageHeight":900,
        "backgroundColor":"#187772","eyebrow":"MÁS VENDIDO",
        "heading":"Botas con Punta de Acero",
        "body":"La protección más completa para entornos industriales de alto riesgo.",
        "link":{"label":"Ver Modelos","url":"/catalog","newTab":false},"textColor":"light"
      },
      {
        "id":"bt-2","size":"sm",
        "image":"/media/safestep/suela.png","imageAlt":"Suela anti-deslizante","imageWidth":500,"imageHeight":600,
        "backgroundColor":"#777a6f","eyebrow":null,
        "heading":"Suela Anti-Deslizante","body":null,
        "link":{"label":"Ver Más","url":"/catalog","newTab":false},"textColor":"light"
      },
      {
        "id":"bt-3","size":"sm",
        "image":null,"imageAlt":"","imageWidth":null,"imageHeight":null,
        "backgroundColor":"#ff0001","eyebrow":null,
        "heading":"Cotización Empresarial","body":"Precios especiales para pedidos al mayoreo.",
        "link":{"label":"Solicitar","url":"/","newTab":false},"textColor":"light"
      },
      {
        "id":"bt-4","size":"sm",
        "image":null,"imageAlt":"","imageWidth":null,"imageHeight":null,
        "backgroundColor":"#f4f4f4","eyebrow":null,
        "heading":"Certificaciones","body":"NOM-113-STPS · ISO 20345:2011",
        "link":{"label":"Ver Normas","url":"/","newTab":false},"textColor":"dark"
      },
      {
        "id":"bt-5","size":"sm",
        "image":"/media/safestep/caja-envio.png","imageAlt":"Caja de envío Safe Step","imageWidth":300,"imageHeight":270,
        "backgroundColor":"#e5f4f3","eyebrow":null,
        "heading":"Envíos Nacionales","body":"A todo el país en 3–5 días hábiles.",
        "link":null,"textColor":"dark"
      }
    ],
    "gap": "md",
    "minHeight": 420
  }',
  true
);

-- 9. Separador
INSERT INTO widget (name, type, route, area, sort_order, settings, status) VALUES (
  'SafeStep - Separador 3',
  'separator',
  '["homepage"]',
  '["content"]',
  90,
  '{"size":"lg","showLine":false}',
  true
);

-- 10. Brand Story — historia y misión
INSERT INTO widget (name, type, route, area, sort_order, settings, status) VALUES (
  'SafeStep - Historia de Marca',
  'brand_story',
  '["homepage"]',
  '["content"]',
  100,
  '{
    "layout": "image-left",
    "image": "/media/safestep/logo-safestep.png",
    "imageAlt": "Safe Step — Calzado de Seguridad Industrial",
    "imageWidth": 600,
    "imageHeight": 400,
    "eyebrow": "NUESTRA MARCA",
    "heading": "Más de una Década Protegiendo Trabajadores",
    "body": "Safe Step nació con una misión clara: fabricar calzado de seguridad industrial que realmente proteja. Cada bota es el resultado de años de investigación, materiales seleccionados y pruebas rigurosas.",
    "bodySecondary": "Hoy, miles de trabajadores confían en Safe Step para llegar seguros a casa cada día. Esa es nuestra mayor satisfacción.",
    "link": {"label":"Conoce Nuestra Historia","url":"/","newTab":false},
    "pullQuote": "La seguridad no es un lujo, es un derecho de todo trabajador.",
    "imageSize": 50
  }',
  true
);

-- 11. Separador
INSERT INTO widget (name, type, route, area, sort_order, settings, status) VALUES (
  'SafeStep - Separador 4',
  'separator',
  '["homepage"]',
  '["content"]',
  110,
  '{"size":"md","showLine":true,"lineColor":"#e1e3e5"}',
  true
);

-- 12. FAQ
INSERT INTO widget (name, type, route, area, sort_order, settings, status) VALUES (
  'SafeStep - Preguntas Frecuentes',
  'faq_block',
  '["homepage"]',
  '["content"]',
  120,
  '{
    "heading": "Preguntas Frecuentes",
    "sections": [
      {
        "id":"sec-1","type":"faq","heading":null,
        "items": [
          {"id":"q-1","question":"¿Qué normas certifican el calzado Safe Step?","answer":"Nuestro calzado cumple con la Norma Oficial Mexicana NOM-113-STPS-2009 y la norma internacional ISO 20345:2011."},
          {"id":"q-2","question":"¿Ofrecen descuentos para compras por volumen?","answer":"Sí, contamos con precios especiales para empresas y distribuidores. Contáctanos para recibir una cotización personalizada."},
          {"id":"q-3","question":"¿Cuánto tiempo dura el calzado Safe Step?","answer":"Con el uso adecuado, nuestras botas tienen una vida útil de 12 a 18 meses. Ofrecemos garantía de 6 meses por defectos de fabricación."},
          {"id":"q-4","question":"¿Cuáles son los métodos de pago?","answer":"Aceptamos tarjetas de crédito y débito, transferencia bancaria y PayPal."},
          {"id":"q-5","question":"¿Realizan envíos internacionales?","answer":"Sí, enviamos a todo el país y a varios países. Los pedidos mayores a $75 USD tienen envío gratis."}
        ]
      }
    ],
    "maxWidth": "normal",
    "allowMultipleOpen": false
  }',
  true
);

COMMIT;

-- Verificación
SELECT name, type, route, area, sort_order
FROM widget
ORDER BY route::text, area::text, sort_order;
