## changelog
1223
  - [ ] 导视接口
  - [ ] 每次第一次提交, 都会刷新页面
  - [ ] websocket 保活
  - [ ] des组件优化
  - [ ] 设备激活方式
  - [ ] 资源cdn化
  - [ ] 加入 css modules
1222
  - [ ] 批量查询isbn
  - [ ] 单个关键词搜索添加
1221
  - [ ] mysql 类型强校验 
  - [ ] moment 时间处理
    
1220
  - [x0.9] termianl crud
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