// this is what we called DEEPDARKFANTESY
'use strict'
const Controller = require('egg').Controller
const bcrypt = require('bcryptjs')

class DeepDarkFantasyController extends Controller {
  async get() {
    const ctx = this.ctx
    // ctx.body = await ctx.model.User.findById(toInt(ctx.params.id));
    ctx.body = await ctx.model.User.findByPk(ctx.params.id)
  }

  async post() {
    const res = await this.service.user.create()
    await console.log(`res ... ${JSON.stringify(res, undefined, 2)}`)
    this.createToken(res.id)
  }
  /**
   * 生成 Token
   * @param {Object} data
   * 加密
   */
  async createToken(data) {
    const { app, ctx, service, config, logger } = this
    ctx.body = app.jwt.sign(data, config.jwt.secret)
  }

  /**
   * 验证token的合法性
   * @param {String} token
   * 解密
   */
  verifyToken(userID) {
    const { app, config, ctx } = this.app
    let bearerToken = ctx.request.header.authorization
    let token = bearerToken && bearerToken.replace('Bearer ', '')
    return new Promise((resolve, reject) => {
      app.jwt.verify(token, config.jwt.secret, function(err, decoded) {
        let result = {}
        if (err) {
          /*
                 err = {
                   name: 'TokenExpiredError',
                   message: 'jwt expired',
                   expiredAt: 1408621000
                 }
               */
          result.verify = false
          result.message = err.message
        } else {
          result.verify = true
          result.message = decoded
        }
        resolve(result)
      })
    })
  }
}
module.exports = DeepDarkFantasyController
