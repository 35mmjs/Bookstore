const { Service } = require('egg')
const { omit } = require('../common/utils')

class UserService extends Service {
  async find(uid) {
    const user = await this.app.mysql.get('users', { id: uid, deleted: 0 })
    return user
  }

  async findAll() {
    const items = await this.app.mysql.select('users', {
      where: { deleted: 0 },
    })
    return items.map(item => omit(item, ['password', 'salt']))
  }

  async getUserByPassword(username, password) {
    const user = await this.app.mysql.get('users', { username, deleted: 0 })
    if (!user) return { error: '用户不存在' }
    const md5 = this.ctx.helper.md5
    const currentPassword = md5(md5(password) + user.salt)
    if (currentPassword === user.password) {
      return { user }
    }
    return { error: '密码错误' }
  }

  async create(username, password, isAdmin, enterprise) {
    const { password: encryptedPwd, salt } = this.ctx.helper.encrypt(password)
    const result = await this.app.mysql.insert('users', {
      username, password: encryptedPwd, is_admin: isAdmin ? 1 : 0, salt, enterprise,
    })
    return result.affectedRows === 1
  }

  async update(uid, name, enterprise) {
    const row = {
      id: uid,
      name,
      enterprise,
    }
    const result = await this.app.mysql.update('users', row)
    return result.affectedRows === 1
  }

  async remove(uid) {
    const row = {
      id: uid,
      deleted: 1,
    }
    const result = await this.app.mysql.update('users', row)
    return result.affectedRows === 1
  }
}

module.exports = UserService
