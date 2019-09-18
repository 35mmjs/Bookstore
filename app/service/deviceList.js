const { Service } = require('egg')

const DB = 'device_list'
class DeviceListService extends Service {
  async findOne(id) {
    const item = await this.app.mysql.get(DB, { id, deleted: 0 })
    return item
  }

  async create(params) {
    const { store_id, client_id, name, type, location, nav_id, rank_id } = params
    const result = await this.app.mysql.insert(DB, {
      client_id,
      store_id,
      type,
      name,
      location,
      nav_id,
      rank_id,
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
      deleted: 1,
    }
    const result = await this.app.mysql.update(DB, row)
    return result.affectedRows === 1
  }
}

module.exports = DeviceListService
