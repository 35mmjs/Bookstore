const { Service } = require('egg')

const DB = 'ads'
class AdsService extends Service {
  async findAll(params) {
    
    const { type } = params
    if (type && type !== 'all') {
      const items = await this.app.mysql.select(DB, {
        where: { is_delete: 0, type },
      })
      // return { items }
      return JSON.parse(JSON.stringify(items))
    }
    
    const items = await this.app.mysql.select(DB, {
      where: { is_delete: 0 },
    })
    return JSON.parse(JSON.stringify(items))
  }

  async findOneByEIdCd (params) {
    const { enterprise, store, type } = params
    const items = await this.app.mysql.select(DB, {
      where: { is_delete: 0, enterprise, type },
    })
    let adList = []
    let tempList = JSON.parse(JSON.stringify(items))
    if (tempList && tempList.length > 0) {
      for (let i = 0;i < tempList.length; i++){
        let item = tempList[i]
        let cannotUseList = (item.store_list ||'').split(',')
        if(cannotUseList && cannotUseList.length > 0){
          let newcantlist = cannotUseList.filter(n => n === store)
          if(newcantlist && newcantlist.length > 0){
          }else{
            adList.push(item)
          }
        }
      }
    }
    const item1List = await this.app.mysql.select(DB, {
      where: { is_delete: 0, store, type },
    })
    let tempList1 = JSON.parse(JSON.stringify(item1List))
    if(tempList1 && tempList1.length > 0){
      adList.concat(tempList1)
    }
    return { adList }
  }

  async findOne(id) {
    const item = await this.app.mysql.get(DB, { id, is_delete: 0 })
    return item
  }

  async create(params) {
    const { enterprise, store, url, play_time, type, ad_type, note } = params
    const result = await this.app.mysql.insert(DB, {
      enterprise,
      store,
      type,
      ad_type,
      url,
      play_time,
      note,
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
