'use strict'
module.exports = (app) => {
  if (app.config.env === 'local' || app.config.env === 'unittest') {
    app.beforeStart(async () => {
      console.log('app.js is actioned!@')
      await app.model.sync({ force: true })
    })
    app.beforeStart(async () => {})
  }
}
