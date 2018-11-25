const { Service } = require('egg')

class AdminService extends Service {
  async find(uid) {
    const user = await this.app.mysql.get('users', { id: uid })
    return { user }
  }
  async create(name, userPassword) {
    const { password, salt } = this.ctx.helper.encrypt(userPassword)
    const result = await this.app.mysql.insert('admins', { name, password, salt })
    return result.affectedRows === 1
  }
}

module.exports = AdminService
