/**
 * Configuración de Square — leída SIEMPRE desde variables de entorno.
 *
 * El Access Token (secreto) nunca se guarda en la base de datos: vive solo en
 * el entorno (Dokploy → Environment / .env). Los IDs públicos (Application ID,
 * Location ID) y el environment también se leen del entorno.
 *
 * Variables:
 *   SQUARE_ENVIRONMENT            'sandbox' | 'production'  (default: sandbox)
 *   SQUARE_APPLICATION_ID         público  (frontend Web Payments SDK)
 *   SQUARE_LOCATION_ID            público  (frontend + backend)
 *   SQUARE_ACCESS_TOKEN           SECRETO  (solo backend)
 *   SQUARE_WEBHOOK_SIGNATURE_KEY  SECRETO  (opcional, verificación de webhooks)
 */

export interface SquareConfig {
  environment: 'sandbox' | 'production';
  applicationId: string;
  locationId: string;
  accessToken: string;
  webhookSignatureKey: string;
}

export function getSquareConfig(): SquareConfig {
  const env = (process.env.SQUARE_ENVIRONMENT || 'sandbox').toLowerCase();
  return {
    environment: env === 'production' ? 'production' : 'sandbox',
    applicationId: process.env.SQUARE_APPLICATION_ID || '',
    locationId: process.env.SQUARE_LOCATION_ID || '',
    accessToken: process.env.SQUARE_ACCESS_TOKEN || '',
    webhookSignatureKey: process.env.SQUARE_WEBHOOK_SIGNATURE_KEY || ''
  };
}

/** True solo si las claves mínimas para cobrar están presentes en el entorno. */
export function isSquareConfigured(): boolean {
  const c = getSquareConfig();
  return Boolean(c.applicationId && c.locationId && c.accessToken);
}

/** Base de la API REST de Square según el entorno. */
export function getSquareApiBase(environment: string): string {
  return environment === 'production'
    ? 'https://connect.squareup.com'
    : 'https://connect.squareupsandbox.com';
}
