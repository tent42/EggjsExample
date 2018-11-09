'use strict'
const Controller = require('egg').Controller
const bcrypt = require('bcryptjs')

function toInt(str) {
  if (typeof str === 'number') return str
  if (!str) return str
  return parseInt(str, 10) || 0
}

class UserController extends Controller {
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
    console.log(
      `ctx.request.body ... ${JSON.stringify(ctx.request.body, undefined, 2)}`
    )
    let { password } = ctx.request.body
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(password, salt)
    password = hash
    const user = await ctx.model.User.create({
      username,
      password,
      email,
      phone
    })
    // password = bcrypt.compareSync(password, hash); // true
    password = ctx.status = 201
    ctx.body = user
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
  // async index() {
  //   this.service.user.index()
  // }

  // async show() {
  //   this.service.user.show()
  // }

  // async create() {
  //   this.service.user.create()
  // }

  // async update() {
  //   this.service.user.update()
  // }

  // async destroy() {
  //   this.service.user.destroy()
  // }
}

module.exports = UserController
