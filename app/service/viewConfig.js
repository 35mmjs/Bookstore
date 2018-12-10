const { Service } = require('egg')

const DB = 'view_configs'
class ViewConfig extends Service {
  async findAll() {
    const items = await this.app.mysql.select(DB, {
      where: { deleted: 0 },
    })
    return { items }
  }

  async find(uid) {
    const item = await this.app.mysql.get(DB, { id: uid, deleted: 0 })
    return { item }
  }

  async create(params) {
    const { note, type, content } = params
    const result = await this.app.mysql.insert(DB, { note, type, content })
    return result.affectedRows === 1
  }

  async update(uid, name) {
    const row = {
      id: uid,
      name,
    }
    const result = await this.app.mysql.update(DB, row)
    return result.affectedRows === 1
  }

  async remove(uid) {
    const row = {
      id: uid,
      deleted: 1,
    }
    const result = await this.app.mysql.update(DB, row)
    return result.affectedRows === 1
  }
}

module.exports = ViewConfig
