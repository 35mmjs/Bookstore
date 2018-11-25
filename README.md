# Bookstore


### 本地开发

启动mysql/redis, 配置环境变量:

```bash
export MYSQL_PASSWORD="xxx" ## mysql密码
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

### 生产部署

```bash
$ npm run egg-start
$ npm run egg-stop
```

### 单元测试
- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。

### About

- [Egg](https://eggjs.org)
- [Redis安全须知](https://ruby-china.org/topics/28094)
- [Egg-Mysql](https://eggjs.org/zh-cn/tutorials/mysql.html)

## MOCK
### 前端mock
### 后端mock
