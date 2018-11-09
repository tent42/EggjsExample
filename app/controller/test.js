'use strict'
const Controller = require('egg').Controller

function toInt(str) {
  if (typeof str === 'number') return str
  if (!str) return str
  return parseInt(str, 10) || 0
}

class TestController extends Controller {
  async index() {
    const ctx = this.ctx
    const query = {
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset)
    }
    ctx.body = await ctx.model.Test.findAll(query)
  }

  async show() {
    const ctx = this.ctx
    // ctx.body = await ctx.model.Test.findById(toInt(ctx.params.id));
    ctx.body = await ctx.model.Test.findByPk(ctx.params.id)
  }

  async create() {
    const ctx = this.ctx
    const {
      title,
      introduction,
      author,
      tag,
      content,
      category,
      ownerId
    } = ctx.request.body
    const user = await ctx.model.Test.create({
      title,
      introduction,
      author,
      tag,
      content,
      category,
      ownerId
    })
    ctx.status = 201
    ctx.body = user
  }

  // async update() {
  //   const ctx = this.ctx;
  //   const id = toInt(ctx.params.id);
  //   const user = await ctx.model.Test.findById(id);
  //   if (!user) {
  //     ctx.status = 404;
  //     return;
  //   }
  //   const { username, password, email, phone } = ctx.request.body;
  //   await user.update({ username, password, email, phone });
  //   ctx.body = user;
  // }

  // async destroy() {
  //   const ctx = this.ctx;
  //   const id = toInt(ctx.params.id);
  //   const user = await ctx.model.Test.findById(id);
  //   if (!user) {
  //     ctx.status = 404;
  //     return;
  //   }

  //   await user.destroy();
  //   ctx.status = 200;
  // }
}

module.exports = TestController
