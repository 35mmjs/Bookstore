const { Service } = require('egg')

const VIEW_CONFIGS = 'view_configs'
const TERMINALS = 'terminals'
class OpenApi extends Service {
  async getPubu(id) {
    const items = await this.app.mysql.get(VIEW_CONFIGS, {
      id,
    })
    return items
  }

  async getDaoshi(id) {
    const items = await this.app.mysql.get(VIEW_CONFIGS, {
      id,
    })
    return items
  }

  /**
   * 通过门店id和终端id确定唯一视图id
   * @param {*} storeId
   * @param {*} terminalId
   */
  async findViewConfigByStoreAndTerminal(storeId, terminalId) {
    const terminal = await this.app.mysql.get(TERMINALS, {
      id: terminalId,
    })
    const viewConfigId = terminal.view_config
    if (viewConfigId) {
      const viewConfig = await this.app.mysql.get(VIEW_CONFIGS, {
        id: viewConfigId,
      })
      return viewConfig
    }
    return null
  }

  async getZhantai(id) {
    const items = await this.app.mysql.get(VIEW_CONFIGS, {
      id,
    })
    return items
  }

  async find(uid) {
    const item = await this.app.mysql.get(VIEW_CONFIGS, { id: uid, deleted: 0 })
    return { item }
  }

  async create(params) {
    const { note, type, content } = params
    const result = await this.app.mysql.insert(VIEW_CONFIGS, {
      note,
      type,
      content,
    })
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
