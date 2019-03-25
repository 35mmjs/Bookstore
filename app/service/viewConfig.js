const { Service } = require('egg')

const DB = 'view_configs'
class ViewConfig extends Service {
  async findAll(params) {
    // const items = await this.app.mysql.select(DB, {
    //   where: { deleted: 0, ...params },
    // })
    // return { items }
    if (!params.store) {
      throw new Error('配置无法获取对应门店id')
    }
    if ((!params.note || !params.type)) {
      const items = await this.app.mysql.query(`
select view_configs.*, terminal_types.name as view_configs_type from \`view_configs\` left join \`terminal_types\`
  on view_configs.type = terminal_types.id
  where view_configs.deleted = 0 and view_configs.store = ${Number(params.store)}`)
      return { items }
    }
    const items = await this.app.mysql.select(DB, {
      where: {
        deleted: 0,
        ...params,
      },
    })
    return { items }
  }

  async findOne(uid) {
    const item = await this.app.mysql.get(DB, { id: uid, deleted: 0 })
    return item
  }

  async create(params) {
    const { note, type, content, store } = params
    const result = await this.app.mysql.insert(DB, { note, type, content, store })
    return result.affectedRows === 1
  }

  async update(params) {
    const result = await this.app.mysql.update(DB, params)
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
