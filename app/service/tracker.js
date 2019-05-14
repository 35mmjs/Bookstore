const { Service } = require('egg')

const TRACKER = 'tracker'
class TrackerService extends Service {
  async findAll(query) {
    // 获取过去一周数据, 获取终端商店id
    if (query.isAdmin === true) {
      // 管理员可见全部
      let newItems
      const items = await this.app.mysql.query(`
    select tracker.*, terminals.store as terminal_store, terminals.name as terminal_name from tracker left join terminals
    on tracker.terminal = terminals.id
    where tracker.updated_at between date_sub(now(),INTERVAL 1 WEEK) and now()
    order by updated_at desc
    `)
      newItems = items
      const stores = await this.app.mysql.query(`
    select stores.* from stores
    where stores.deleted = 0
    `)
      if (items && items.length > 0) {
        newItems = items.map(item => {
          const storeId = item.terminal_store
          const choosenStore = stores.find(i => i.id === storeId)
          if (choosenStore) {
            return {
              ...item,
              store_name: choosenStore.name,
            }
          }
          return item
        })
      }
      return newItems
    }
    if (query.isAdmin === false) {
      let newItems = []
      const storeId = query.store
      // 只获取当前门店下的数据
      const items = await this.app.mysql.query(`
    select tracker.*, terminals.store as terminal_store, terminals.name as terminal_name from tracker left join terminals
    on tracker.terminal = terminals.id
    where tracker.updated_at between date_sub(now(),INTERVAL 1 WEEK) and now()
    order by updated_at desc
    `)
      if (items && items.length > 0) {
        newItems = items.filter(item => item.terminal_store === storeId)
      }
      return newItems
    }
    return []
  }
}

module.exports = TrackerService
