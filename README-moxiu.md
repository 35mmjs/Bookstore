## 3月收尾工作
- [ ] 增加列表拖拽
- [x] 排行榜可编辑
- [ ] 
## 3月TODO
- [x] 增加批量添加按钮
- [x] 删除的判重操作, 每次新增重复的就会有问题
- [x] 展台的提交问题
- [ ] 一个入口页面, 用来手动做调转
## 1230 进度汇总
### 已经完成
- [x] view_configs, terminals, stores 的全部crud
- [x] 视图配置,针对三种瀑布/导视/展台, 做了灵活配置
- [x]部分样式优化
- [x] 主链路已经跑通, 终端通过clientId(设备id)可以获取对应后台配置的视图配置
- [x] 一键部署到生产服务器

### 待完成
- [x] emplyoee, user, enterprise 3个的crud
- [x] 页面权限
- [x] 构建优化, 打包到cdn
- 链路优化/打磨(最终达到用户不需要教程直接使用的地步)
- 代码/组件复用待优化


### 备注
1. 主链路是, 用户新增teminal_types(由于crud没做, 目前是手动插入数据库)新增企业=>新增设备, 新增视图, 绑定设备和视图配置

2. 相关账号密码如下

生产环节阿里云账号

    账号:树联互联(没错是拼音)
    密码:shulian1225

生产服务器

    ssh账密
        root@47.96.181.54
        WAZLfMUtVgTcP6V
    MYSQL账密
        root
        BookStore2018@!MYSQL.PROD
        admin
        BookStore2018@!MYSQL.PROD.ADMIN

3. 生产环节部署

// 在升级pkg.json版本后
```
npm run tag
npm run deploy-prod
```



## changelog
0113
  - [ ] sql migration, 新增配置类型
  - [ ] 数据库关联查询
1230
  - [ ] layout 改造
  - [ ] Description 组件可以提炼
  - [ ] json view
1227
  - [x] 主链路串联
  - [x] 排行榜录入
1226
  - [x0.5] store crud
1225
  - [ ] 配置可排序
1223
  - [ ] 设置title 动态
  - [x] 导视接口
  - [x] 每次第一次提交, 都会刷新页面 => preventDefault()
  - [ ] websocket 保活
  - [ ] des组件优化
  - [ ] 设备激活方式
  - [ ] 资源cdn化
  - [ ] 加入 css modules
1222
  - [x] 批量查询isbns
  - [x] 搜索关键字添加书籍
  - [ ] 单个关键词搜索添加
1221
  - [ ] mysql 类型强校验 
  - [x] moment 时间处理
    
1220
  - [x] termianl crud
  - [x] sql schema update
1219
  - [ ] 瀑布优化
  - [ ] dva报错-配置备注
处理
1218
  - [x] 部署优化
  - [x0.5] 开通展台接口
  - [ ] 部署优化
  - [ ] 展台接口/模糊搜索接口
  - [ ] 推荐接口
1217
  - [ ] 美化界面
1216
  - [ ] 所有表单校验
1215
  - [x] 调用六娃接口, 获取图书, 新建通用组件
  - [x0.5] 高阶组件封装ModalForm
  - 18:00前
    - [x0.5] terminal 
1212
  - [ ] mysql model 统一判空校验
  - [ ] 配置支持多种设备类型
  - [ ] 表关联
  - [ ] 统一restful 接口
  - [ ] 部署脚本优化, 解决npm运行问题
  - [x0.5] terminal done, view config done
  - [ ] 分页 
  - [x] 只有 view config 才有单独的crud url, 其他均在单页面完成
  - [ ] mysql 每次部署, 需要重新启动的问题, debug
1211
  - [x] deploy to dev server, run 1st open 
  - [x0.2] apply dva to all model 
1209
  - [ ] all models done
  - [x] add config crud 瀑布
  - [x] add CDN for all developer
  - [ ] deploy to dev server, run 1st open api
1208
  - [x0.2] add mock for all models
  - [x0.2] all views done
  - [x] add dva/redux
1206
  - [ ] add mock for all models
1205
  - [x] add CDN
  - [x] terminal view
  - [x] detail view each
1204
  - [x0.5] import antd pro component to each route
1202
  - [x] add router and layout
  - [x] add enterprice crud
  - [x] add redux
  - [x] add mock/add mockjs to simulate data 
  - [x] model 一条龙优化, 比如前后端保持一致, 减少重复代码
  - [x0.5] add store crud




## Notes
- 暂时不提炼公共方法, 把需求确定了, 再收回来
- 1205 view struture
  - temrinal/manage
    - TableView
    - CardView
    - Common
      - DetailView
      - FormView
        - create/update

## option features
- 配置预览功能

## How to
### run mock
open terminal1: npm run mock
open termianl2: npm run dora-proxy // no hmr, livehood
edit /mock/* files // you can add mock data
## Repo 



## 瀑布屏/展台/导视

## 展台是用户配置的
## 瀑布屏 所有瀑布屏都一样
首页banner
bannerImg
category
  - items
    -  

## 接口约定
异常统一由 ajax.js 维护
dva 只处理业务当中报错

## 其他
react router zh
https://react-guide.github.io/react-router-cn/docs/API.html#redirect
mysql db doc
https://github.com/ali-sdk/ali-rds

## 如何部署
// 提交代码后, 更改版本号
npm run tag
npm run deploy

## 相关链接
CDN 七牛云存储
https://www.qiniu.com/
服务器阿里云 ECS

Node.js 性能平台
https://node.console.aliyun.com/#!/owned

持续集成
https://circleci.com/pricing/
https://travis-ci.org/


## 关于排行的redis设计
### 排行的payload
  先set paihang nav, 再update, paiahng_pad就有信息了
  1. clientId, navId 确定唯一排行导航信息
  key: paihang_nav_${clientId}_${navId}
  value: 
  {
    catelogId: 1,
    catelogName: '',
    catelog: [],
    content: [
      {
        books: [],
        channel: '',
        key: '',
      }
    ],
  }
  2. clientId, navId 确定唯一排行pad信息
  key: paihang_pad_${clientId}_${navId}
  value:
  [
    {books}
  ]


