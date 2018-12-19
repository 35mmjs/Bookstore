const { Service } = require('egg')

const DB = 'terminals'
class Terminal extends Service {
  async findAll(params) {
    // const results = await this.app.mysql.select('posts', { // 搜索 post 表
    //   where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
    //   columns: ['author', 'title'], // 要查询的表字段
    //   orders: [['created_at','desc'], ['id','desc']], // 排序方式
    //   limit: 10, // 返回数据量
    //   offset: 0, // 数据偏移量
    // });
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
    const { note, type, content } = params
    const result = await this.app.mysql.insert(DB, { note, type, content })
    return result.affectedRows === 1
  }

  async update(params) {
    const row = {
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
