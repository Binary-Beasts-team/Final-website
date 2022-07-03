const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/auth/google',
    createProxyMiddleware({
      target: 'https://server-bice-nine.vercel.app/'
    })
  );
};



