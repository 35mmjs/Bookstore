const { Controller } = require('egg')
const { filter } = require('../common/utils')

class TerminalController extends Controller {
  // post
  async create() {
    const request = this.ctx.request.body
    const result = await this.ctx.service.terminal.create(request)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  // get
  async findAll() {
    const { query } = this.ctx
    // filter undefined value
    const notEmptyQuery = filter(query, (value, key) => value)
    const result = await this.ctx.service.terminal.findAll(notEmptyQuery)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  // get
  async findOne() {
    const query = this.ctx.query
    const { id } = query
    const result = await this.ctx.service.terminal.findOne(id)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async remove() {
    const query = this.ctx.query
    const { id } = query
    const result = await this.ctx.service.terminal.remove(id)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async update() {
    const request = this.ctx.request.body
    console.log('ccccccccccc', request)
    
    const notEmptyQuery = filter(request, (value, key) => value)
    const result = await this.ctx.service.terminal.update(notEmptyQuery)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }
}

module.exports = TerminalController
