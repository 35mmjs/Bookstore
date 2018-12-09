
// 登陆检测
module.exports = () => {
  return async function (ctx, next) {
    const loginUser = ctx.getLoginUser()
    const { url } = ctx.request
    // 检测是否登陆, TODO 后边可以加入白名单跳过校验
    if (!loginUser && !/^\/user\//.test(url)) {
      ctx.redirect('/user/login.html')
      return
    }
    await next()
  }
}
