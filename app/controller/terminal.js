const { Controller } = require('egg')

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
    const result = await this.ctx.service.terminal.findAll(query)
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
    const result = await this.ctx.service.terminal.create(request.name, request.password)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }
}

module.exports = TerminalController
