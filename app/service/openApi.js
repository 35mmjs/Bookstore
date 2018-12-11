const { Service } = require('egg')

const VIEW_CONFIGS = 'view_configs'
class OpenApi extends Service {
  async getPubu() {
    const items = await this.app.mysql.select(VIEW_CONFIGS, {
      // where: { deleted: 0 },
    })
    return items
  }

  async find(uid) {
    const item = await this.app.mysql.get(VIEW_CONFIGS, { id: uid, deleted: 0 })
    return { item }
  }

  async create(params) {
    const { note, type, content } = params
    const result = await this.app.mysql.insert(VIEW_CONFIGS, { note, type, content })
    return result.affectedRows === 1
  }

  async update(uid, name) {
    const row = {
      id: uid,
      name,
    }
    const result = await this.app.mysql.update(VIEW_CONFIGS, row)
    return result.affectedRows === 1
  }

  async remove(uid) {
    const row = {
      id: uid,
      deleted: 1,
    }
    const result = await this.app.mysql.update(VIEW_CONFIGS, row)
    return result.affectedRows === 1
  }
}

module.exports = OpenApi
