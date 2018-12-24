const { genQiniuToken } = require('../common/cdn')

const loginIgnoreList = [
  /^\/user\//,
  /^\/page\//,
  /^\/open\//,
  /^\/public\//,
]
// 登陆检测 注入 cdn 上传token
module.exports = () => {
  return async function (ctx, next) {
    const loginUser = ctx.getLoginUser()
    const { url } = ctx.request
    // 检测是否登陆, TODO 后边可以加入白名单跳过校验
    if (!loginUser && !loginIgnoreList.find(reg => reg.test(url))) {
      ctx.redirect('/user/login.html')
      return
    }
    // TODO
    const token = genQiniuToken()
    ctx.cookies.set('upload-token', token, {
      httpOnly: false,
      signed: false,
    })
    await next()
  }
}
