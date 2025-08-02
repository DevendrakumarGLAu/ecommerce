const { execSync } = require('child_process');
const fs = require('fs');

try {
  const productData = JSON.parse(fs.readFileSync('src/assets/product.json', 'utf-8'));
  const productRoutes = productData.map(p => `/product/${p.id}`);

  const routes = ['/', ...productRoutes];

  const angularJsonPath = 'angular.json';
  const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf-8'));

  angularJson.projects.firozabadbangles.architect.prerender.options.routes = routes;

  fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2));
  console.log('Updated angular.json with prerender routes:', routes);

  execSync('ng run firozabadbangles:prerender', { stdio: 'inherit' });
} catch (err) {
  console.error('Error during prerender:', err);
  process.exit(1);
}
