'use strict'
const Service = require('egg').Service
const bcrypt = require('bcryptjs')

function toInt(str) {
  if (typeof str === 'number') return str
  if (!str) return str
  return parseInt(str, 10) || 0
}

class UserService extends Service {
  async index() {
    const ctx = this.ctx
    const query = {
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset)
    }
    ctx.body = await ctx.model.User.findAll(query)
  }

  async show() {
    const ctx = this.ctx
    // ctx.body = await ctx.model.User.findById(toInt(ctx.params.id));
    ctx.body = await ctx.model.User.findByPk(ctx.params.id)
  }

  async create() {
    const ctx = this.ctx
    const { username, email, phone } = ctx.request.body
    let { password } = ctx.request.body
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(password, salt)
    // password = bcrypt.compareSync(password, hash); // true
    password = hash
    return await ctx.model.User.create({
      username,
      password,
      email,
      phone
    })
  }

  async update() {
    const ctx = this.ctx
    const id = ctx.params.id
    const user = await ctx.model.User.findById(id)
    if (!user) {
      ctx.status = 404
      return
    }
    let version = user.version
    version++
    const { username, password, email, phone } = ctx.request.body
    await user.update({ username, password, email, phone, version })
    ctx.body = user
  }

  async destroy() {
    const ctx = this.ctx
    const id = ctx.params.id
    const user = await ctx.model.User.findById(id)
    if (!user) {
      ctx.status = 404
      return
    }

    await user.destroy()
    ctx.status = 200
  }
}
module.exports = UserService
