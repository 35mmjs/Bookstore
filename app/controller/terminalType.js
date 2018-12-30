const { Controller } = require('egg')

class TerminalTypeController extends Controller {
  // get
  async findAll() {
    // const request = this.ctx.params
    const result = await this.ctx.service.terminalType.findAll()
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  // // get
  // async findOne() {
  //   // const request = this.ctx.params
  //   const request = this.ctx.query
  //   const { id } = request
  //   const result = await this.ctx.service.viewConfig.findOne(id)
  //   this.ctx.body = {
  //     success: true,
  //     data: result,
  //   }
  // }

  // async remove() {
  //   const request = this.ctx.request.query
  //   console.log('aaaaaaaa', request)
  //   const result = await this.ctx.service.viewConfig.remove(request.id)
  //   this.ctx.body = {
  //     success: true,
  //     data: result,
  //   }
  // }

  // async update() {
  //   const request = this.ctx.request.body
  //   const result = await this.ctx.service.viewConfig.create(request.name, request.password)
  //   this.ctx.body = {
  //     success: true,
  //     data: result,
  //   }
  // }
}

module.exports = TerminalTypeController
