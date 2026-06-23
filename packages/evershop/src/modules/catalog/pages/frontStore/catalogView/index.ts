import { setPageMetaInfo } from '../../../../cms/services/pageMetaInfo.js';
import type { EvershopRequest } from '../../../../../types/request.js';

export default (request: EvershopRequest, response, next) => {
  setPageMetaInfo(request, {
    title: 'Catálogo — SafeStep Corp',
    description: 'Calzado de seguridad industrial certificado. Botas con punta de acero, anti-deslizantes y resistentes al agua.'
  });
  next();
};
