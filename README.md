# Bookstore


### 本地开发

启动mysql/redis, 配置环境变量:

```bash
export MYSQL_PASSWORD="xxx" ## mysql密码
export ROOT_ADMIN_PASSWORD="" ## 超级管理员密码, 用于创建/删除管理员
export COOKIE_KEYS="xxxx" ## 本地随便填
export REDIS_PASSWORD="" ## 本地为空
export XFRAME_VALUE="xxx" ## 本地随便填
```

启动本地服务器:

```bash
$ npm i
$ npm start
$ open http://localhost:7001/
```

### 创建路由

1. 创建view/entry/yourEntry.js
2. controller里指定新创建的entry:

```javascript
ctx.render('layout/layout.html', { entry: 'yourEntry' })
```

3. router.js 里指定到渲染的controller

```javascript
router.get('/yourEntry.html', controller.home.yourEntry)
```

### 生产环境部署

- [安装gawk](http://macappstore.org/gawk/)
- 将代码合并到stable(生产环境分支)并push
- 运行 npm run deploy-prod

### 生产环境重启/停止服务器

```bash
$ npm run egg-start
$ npm run egg-stop
```

### 地址

- [线上服务器](47.96.181.54)

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。

### About

- [Egg](https://eggjs.org)
- [Redis安全须知](https://ruby-china.org/topics/28094)
- [Egg-mysql](https://eggjs.org/zh-cn/tutorials/mysql.html)
- [请求参数校验](https://github.com/node-modules/parameter)
