'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.all('/', async ctx => {
    ctx.redirect('/public/index.html');
  });

  router.all('/api/healthcheck', controller.home.index);

  router.post('/api/generatePacFile', controller.main.generatePacFile);
  router.get('/api/downloacPacFile', controller.main.downloacPacFile);
  router.get('/api/getPacFileInfo', controller.main.getPacFileInfo);
};
