const { Service } = require('egg')

const DB = 'store'
class Terminal extends Service {
  async findAll(params) {
    const items = await this.app.mysql.select(DB, {
      where: {
        deleted: 0,
        ...params,
      },
    })
    return { items }
  }

  async findOne(id) {
    const item = await this.app.mysql.get(DB, { id, deleted: 0 })
    return item
  }

  async create(params) {
    const { name, note, store, type } = params
    const result = await this.app.mysql.insert(DB, {
      name,
    })
    return result.affectedRows === 1
  }

  async update(params) {
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

module.exports = Terminal
