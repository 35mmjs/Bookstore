const { Service } = require('egg')

const VIEW_CONFIGS = 'view_configs'
const TERMINALS = 'terminals'
const TRACKER = 'tracker'
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
      store: storeId,
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

  /**
   * 获取终端信息
   * @param {*} terminalId
   */
  async findTerminal(terminalId) {
    const terminal = await this.app.mysql.get(TERMINALS, {
      id: terminalId,
    })
    return terminal
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

  async setTracker(params) {
    const { act, biz_type = 'normal', biz_data = '', terminal, date } = params
    let result
    // terminal_id, date, biz_type 确定唯一表单
    const item = await this.app.mysql.get(TRACKER, {
      terminal,
      biz_type,
      act,
      date,
    })
    if (item) {
      // update
      result = await this.app.mysql.update(TRACKER, {
        id: item.id,
        value: item.value + 1,
        biz_data,
      })
    } else {
      result = await this.app.mysql.insert(TRACKER, {
        terminal,
        biz_type,
        biz_data,
        act,
        value: 1,
        date,
      })
    }
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
