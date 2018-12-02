const { Service } = require('egg')

const ENTERPRISES = 'enterprises'
class EnterpriseService extends Service {
  async findAll() {
    const items = await this.app.mysql.select(ENTERPRISES)
    return { items }
  }

  async find(uid) {
    const item = await this.app.mysql.get(ENTERPRISES, { id: uid })
    return { item }
  }

  async create(name) {
    const result = await this.app.mysql.insert(ENTERPRISES, { name })
    return result.affectedRows === 1
  }

  async update(uid, name) {
    const row = {
      id: uid,
      name,
    }
    const result = await this.app.mysql.update(ENTERPRISES, row)
    return result.affectedRows === 1
  }

  async delete(uid) {
    const row = {
      id: uid,
      deleted: 1,
    }
    const result = await this.app.mysql.update(ENTERPRISES, row)
    return result.affectedRows === 1
  }
}

module.exports = EnterpriseService
