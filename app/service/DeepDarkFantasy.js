// this is what we called DEEPDARKFANTESY
'use strict'
const Service = require('egg').Service

class DeepDarkFantasyService extends Service {
  /**
   * 生成 Token
   * @param {Object} data
   * 加密
   */
  createToken(data) {
    const { app, ctx, service, config, logger } = this.app
    return app.jwt.sign(data, config.jwt.secret, {
      expiresIn: '12h'
    })
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
module.exports = DeepDarkFantasyService
