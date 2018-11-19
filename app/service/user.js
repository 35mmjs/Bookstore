const { Service } = require('egg')

class UserService extends Service {
  async find(uid) {
    const user = await this.app.mysql.get('users', { id: uid })
    return { user }
  }
}

module.exports = UserService
