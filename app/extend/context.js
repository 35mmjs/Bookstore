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
  async getStoreCodeFromQuery() {
    if (!this.query.orgId) {
      throw new CommonError('未传入门店id')
    }
    const currentStore = await this.service.store.findOne(this.query.orgId)
    if (!currentStore) {
      throw new CommonError(`未招到到门店id: ${this.query.orgId}`)
    }
    const [storeCode, storeNum] = currentStore.store_code.split('-')
    return {
      storeCode, // 门店编号
      storeNum, // 部门编号
    }
  },
}
