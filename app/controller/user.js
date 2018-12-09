const ms = require('ms')
const { Controller } = require('egg')

class UserController extends Controller {
  async login() {
    const ctx = this.ctx
    const { username, password, rememberMe } = ctx.request.body
    const rootPassword = ctx.app.config.root.password
    console.log(ctx.app.error)
    // 超级管理员登陆
    if (username === 'root' && password === rootPassword) {
      ctx.session.root = true
    }
    // if (username === 'root')
    // const result = await this.ctx.service.admins.create(request.username, request.password)
    // 如果用户勾选了 `记住我`，设置 7 天的过期时间
    if (rememberMe) ctx.session.maxAge = ms('7d')
    this.ctx.body = {
      success: true,
      data: {
        username,
        password,
      },
    }
  }
  create() {
    const request = this.ctx.request.body
    // const result = await this.ctx.service.admins.create(request.username, request.password)
    this.ctx.body = {
      success: true,
      data: request,
    }
  }
}

module.exports = UserController
