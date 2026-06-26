import { setPageMetaInfo } from '../../../../cms/services/pageMetaInfo.js';

export default (request, response, next) => {
  setPageMetaInfo(request, {
    title: 'Contacto — SafeStep Corp',
    description: 'Contáctanos para cotizaciones empresariales, consultas técnicas y soporte sobre nuestro catálogo de equipamiento de seguridad industrial.'
  });
  next();
};
