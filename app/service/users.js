const { Service } = require('egg')

class UserService extends Service {
  async find(uid) {
    const user = await this.app.mysql.get('users', { id: uid })
    return user
  }
  // 获取登陆的用户, 如果没有则为空
  getLoginUser() {
    return this.ctx.session.user
  }
  async check(uid, password) {
    const user = await this.app.mysql.get('users', { id: uid })
    const md5 = this.ctx.helper.md5
    const currentPassword = md5(md5(password) + user.salt)
    return currentPassword === user.password
  }
  async create(username, password, isAdmin) {
    const { password: encryptedPwd, salt } = this.ctx.helper.encrypt(password)
    const result = await this.app.mysql.insert('users', { username, password: encryptedPwd, is_admin: isAdmin ? 1 : 0, salt })
    return result.affectedRows === 1
  }
}

module.exports = UserService
