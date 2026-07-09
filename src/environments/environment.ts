export interface Environment {
  production: boolean;
  apiBaseUrl: string;
  siteName: string;
}

export const environment: Environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8000/api/v1',
  siteName: 'Firozabad Bangles'
};
