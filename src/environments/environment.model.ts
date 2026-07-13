export interface Environment {
  production: boolean;
  environmentName: 'development' | 'production';
  apiBaseUrl: string;
  siteName: string;
}
