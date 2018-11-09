'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app
  router.resources('user', '/api/user', controller.user)
  router.resources('test', '/api/test', controller.test)
  router.resources('article', '/api/article', controller.article)
  router.post('/DeepDarkFantasys', controller.deepDarkFantasy.post)
  router.get('/DeepDarkFantasys', controller.deepDarkFantasy.get)
}
