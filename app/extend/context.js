const validates = require('../validates')
const CommonError = require('../common/CommonError')

module.exports = {
  CommonError,
  /**
   * validate data with rules
   *
   * @param  {Object} validateKey  - validate rule object, see [parameter](https://github.com/node-modules/parameter)
   * @param  {Object} [data] - validate target, default to `this.request.body`
   */
  validate(validateKey, data) {
    data = data || this.request.body
    if (!validates[validateKey]) throw new CommonError(`Unknown validate key ${validateKey}`)
    const errors = this.app.validator.validate(validates[validateKey], data)
    if (errors) {
      this.throw(422, 'Validation Failed', {
        code: 'invalid_param',
        errors,
      })
    }
  },
  // 获取登陆的用户, 如果没有则为空
  getLoginUser() {
    return this.session.user
  },
  getLoginStore() {
    const user = this.session.user
    if (!user || !user.store) {
      throw new CommonError('无法获取登陆的门店')
    }
    return user.store
  },
  getLoginEnterprise() {
    const user = this.session.user
    if (!user || !user.enterprise) {
      throw new CommonError('无法获取登陆的企业')
    }
    return user.enterprise
  },
  // 获取登陆的用户id，如果没有则为空
  getLoginUserId() {
    const user = this.session.user
    if (user) return user.id
    return null
  },
  async getBookAPI() {
    let storeId
    const user = this.session.user
    if (user && user.store) {
      storeId = user.store
    } else {
      storeId = this.query.orgId
    }
    if (!storeId) {
      throw new CommonError('未找到门店id')
    }
    const currentStore = await this.service.store.findOne(storeId)
    if (!currentStore) {
      throw new CommonError(`未找到到门店id: ${storeId}`)
    }
    const [storeCode, storeNum, sourceApiName] = currentStore.store_code.split('-')
    const bookAPIName = `bookAPI${sourceApiName ? `By${sourceApiName[0].toUpperCase()}${sourceApiName.slice(1)}` : ''}`
    if (!this.service[bookAPIName]) {
      throw new CommonError(`未找到到门店API: ${bookAPIName}`)
    }
    // 保存到context里
    this.storeCodeFromSession = storeCode
    return {
      storeCode, // 门店编号
      storeNum, // 部门编号
      bookAPI: this.service[bookAPIName], // 真正的调用的bookAPI
    }
  },
}
