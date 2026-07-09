import { Environment } from './environment';

export const environment: Environment = {
  production: true,
  // Replace with the deployed FastAPI backend's base URL before shipping.
  apiBaseUrl: 'https://api.firozabadbangles.com/api/v1',
  siteName: 'Firozabad Bangles'
};
