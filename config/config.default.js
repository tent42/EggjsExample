'use strict'

module.exports = (appInfo) => {
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '4357468468_35402'
  //sequelize 全局
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306
    // sequelize一直报错，说是什么字符有问题的原因，也就是([{+;之类的问题
    // 但是一直没找到问题的原因
    // 这里加上一个false
    // 先让他不报错
    // operatorsAliases: false
  }
  // JWT
  config.jwt = {}
  // CORS && CSRF
  config.security = {
    // csrf在egg中是不建议关闭的.
    // 是的,csrf应该是在服务器安全方面排名非常靠前的需要防御的内容
    // 但是,我们是在做SPA,即react做前端
    // 我们不能保证在每一次开发过程中,都要把react build,然后放在egg的静态中运行
    // 如果是这样的话,是有用处的,但还是不够好
    // 如果是在前后端分离的情况下,我们根本无法保证能达到正确的csrf
    // 因为csrf是在服务器收到请求后,重新生成的,新的csrfToken
    // 那前端怎么知道,在post之类之前就知道,他的csrfToken
    // 这是不可能的
    // 浅谈SPA的CSRF问题
    // https://www.jianshu.com/p/6c2d3fb55e17
    // 这篇文章中提到的,可以使用JWT
    // 那我们就用一次吧!
    csrf: {
      enable: false
    }
  }
  //
  // add your config here
  config.middleware = []

  return config
}
