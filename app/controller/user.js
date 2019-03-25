const ms = require('ms')
const { Controller } = require('egg')

class UserController extends Controller {
  async loginPage() {
    const { ctx } = this
    await ctx.render('layout/layout.html', { entry: 'login' })
  }

  async createAdminPage() {
    const ctx = this.ctx
    await ctx.render('layout/layout.html', { entry: 'createAdmin' })
  }

  // 管理员切换企业
  changeEnterpriseByAdmin() {
    const ctx = this.ctx
    const { enterprise } = ctx.request.body
    const currentUser = ctx.session.user
    if (!currentUser || !currentUser.isAdmin) {
      ctx.body = {
        success: false,
        message: '无权限操作',
      }
      return
    }
    ctx.session.user = Object.assign({}, ctx.session.user, { enterprise: enterprise === 'all' ? null : parseInt(enterprise), store: null })
    ctx.body = {
      success: true,
      message: '切换成功',
    }
  }

  changeStore() {
    const ctx = this.ctx
    const { store } = ctx.request.body
    const currentUser = ctx.session.user
    if (!currentUser) {
      ctx.body = {
        success: false,
        message: '无权限操作',
      }
      return
    }
    ctx.session.user = Object.assign({}, ctx.session.user, { store: store === 'all' ? null : parseInt(store) })
    ctx.body = {
      success: true,
      message: '切换成功',
    }
  }

  logout() {
    const ctx = this.ctx
    ctx.session.user = undefined
    ctx.session.maxAge = undefined
    ctx.body = {
      success: true,
      message: '操作成功',
    }
  }

  async login() {
    const ctx = this.ctx
    const { username, password, rememberMe } = ctx.request.body
    // 表单校验
    ctx.validate('user', { username, password })
    const { error, user } = await this.ctx.service.users.getUserByPassword(username, password)
    if (error) {
      ctx.body = {
        success: false,
        message: error,
      }
      return
    }
    // 保存用户的登陆信息
    ctx.session.user = {
      id: user.id,
      isAdmin: !!user.is_admin,
      isEnterpriseUser: user.enterprise && !user.store,
      username: user.username,
      enterprise: user.enterprise,
      store: user.store,
    }
    // 如果用户勾选了 `记住我`，设置 7 天的过期时间
    if (rememberMe) ctx.session.maxAge = ms('7d')
    ctx.body = {
      success: true,
      data: {
        userId: user.id,
        isAdmin: user.is_admin,
      },
      message: '登陆成功',
    }
  }

  async createAdmin() {
    const ctx = this.ctx
    const { username, password, rootPassword } = ctx.request.body
    // 表单校验
    ctx.validate('user', { username, password })
    if (rootPassword !== ctx.app.config.root.password) {
      this.ctx.body = {
        success: false,
        message: '超级管理员密码校验失败',
      }
    } else {
      const result = await ctx.service.users.create(username, password, true)
      this.ctx.body = {
        success: true,
        data: result,
        message: '创建成功',
      }
    }
  }

  async create() {
    const ctx = this.ctx
    const { username, password, enterprise, store } = ctx.request.body
    ctx.validate('user', { username, password })
    const result = await ctx.service.users.create(username, password, false, enterprise, store)
    this.ctx.body = {
      success: true,
      data: result,
      message: '创建成功',
    }
  }

  async findAll() {
    // const request = this.ctx.params
    const result = await this.ctx.service.users.findAll()
    const user = this.ctx.session.user
    if (user && (user.isEnterpriseUser || user.isAdmin) && user.enterprise) {
      this.ctx.body = {
        success: true,
        data: result.filter(n => n.enterprise === user.enterprise),
      }
      return
    }
    if (user && user.isAdmin) {
      this.ctx.body = {
        success: true,
        data: result,
      }
      return
    }
    this.ctx.body = {
      success: true,
      data: [],
    }
  }

  async remove() {
    const request = this.ctx.request.body
    const result = await this.ctx.service.users.remove(request.id)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async update() {
    const ctx = this.ctx
    const { username, password, enterprise, store, id } = ctx.request.body
    this.ctx.validate('user', { username, password })
    const result = await this.ctx.service.users.update(id, username, password, enterprise, store)
    if (String(ctx.session.user.id) === String(id)) {
      ctx.session.user = undefined
    }
    this.ctx.body = {
      success: true,
      data: result,
    }
  }
}

module.exports = UserController
