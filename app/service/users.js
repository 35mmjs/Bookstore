const { Service } = require('egg')

class UserService extends Service {
  async find(uid) {
    const user = await this.app.mysql.get('users', { id: uid })
    return user
  }
  async getUserByPassword(username, password) {
    const user = await this.app.mysql.get('users', { username })
    if (!user) return { error: '用户不存在' }
    const md5 = this.ctx.helper.md5
    const currentPassword = md5(md5(password) + user.salt)
    if (currentPassword === user.password) {
      return { user }
    }
    return { error: '密码错误' }
  }
  async create(username, password, isAdmin) {
    const { password: encryptedPwd, salt } = this.ctx.helper.encrypt(password)
    const result = await this.app.mysql.insert('users', { username, password: encryptedPwd, is_admin: isAdmin ? 1 : 0, salt })
    return result.affectedRows === 1
  }
}

module.exports = UserService
