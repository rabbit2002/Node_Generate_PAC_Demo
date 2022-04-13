'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.all('/', async (ctx, next) => {
    ctx.redirect('/public/index.html');
  });

  router.all('/api/healthcheck', controller.home.index);

  router.post('/api/generate', controller.main.generatePacFile);
  router.get('/api/getPacFileInfo', controller.main.getPacFileInfo);
};
