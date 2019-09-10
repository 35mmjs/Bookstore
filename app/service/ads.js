const { Service } = require('egg')

const DB = 'ads'
class AdsService extends Service {
  async findAll(params) {
    if (params) {
      const { type } = params
      const items = await this.app.mysql.select(DB, {
        where: { is_delete: 0, type },
      })
      return { items }
    }
    const items = await this.app.mysql.select(DB, {
      where: { is_delete: 0 },
    })
    return { items }
  }

  async findOne(id) {
    const item = await this.app.mysql.get(DB, { id, is_delete: 0 })
    return item
  }

  async create(params) {
    const { enterprise, store, url, play_time, type } = params
    const result = await this.app.mysql.insert(DB, {
      enterprise,
      store,
      type,
      url,
      play_time,
    })
    return result.affectedRows === 1
  }

  async update(params) {
    // const { id, name, note, view_config, type } = params
    const { id } = params
    const row = {
      id,
      ...params,
    }
    const result = await this.app.mysql.update(DB, row)
    return result.affectedRows === 1
  }

  async remove(id) {
    const row = {
      id,
      is_delete: 1,
    }
    const result = await this.app.mysql.update(DB, row)
    return result.affectedRows === 1
  }
}

module.exports = AdsService
