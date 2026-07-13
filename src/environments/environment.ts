export interface Environment {
  production: boolean;
  apiBaseUrl: string;
  siteName: string;
}

export const environment = {
  production: false,
  // apiBaseUrl: 'http://localhost:8000/api/v1',
  apiBaseUrl:'https://ecommerce-admin-backend-d3gh.onrender.com/api/v1',
  siteName: 'Firozabad Bangles'
};
