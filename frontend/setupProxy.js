const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://f2b0-2401-4900-61c6-f7d4-c4ab-c401-7f76-1dfb.ngrok-free.app',
      changeOrigin: true,
    })
  );
};
