import { setPageMetaInfo } from '../../../../cms/services/pageMetaInfo.js';

export default (request, response, next) => {
  setPageMetaInfo(request, {
    title: 'Nosotros — SafeStep Corp',
    description: 'Conoce a SafeStep Corp, proveedor de equipamiento de seguridad industrial para ferreterías, constructoras y empresas en México y América Latina.'
  });
  next();
};
