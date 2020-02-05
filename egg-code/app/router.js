'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/login', controller.user.login);
  router.get('/getList', controller.user.getList);
  router.delete('/del', controller.user.del);
  router.put('/edit', controller.user.edit);
  router.post('/add', controller.user.add);

  router.get('/getRole', controller.role.getRole);
  router.delete('/deleteRelo', controller.role.deleteRelo);
  router.post('/addRelo', controller.role.addRelo);
};
