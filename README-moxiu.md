## changelog
1212
  - [ ] mysql model 统一判空校验
  - [ ] 统一restful 接口
  - [ ] 部署脚本优化, 解决npm运行问题
  - [x0.5] terminal done, view config done
  - [ ] 分页 
  - [ ] 只有 view config 才有单独的crud url, 其他均在单页面完成
  - [ ] mysql 每次部署, 需要重新启动的问题
1211
  - [x] deploy to dev server, run 1st open 
  - [ ] apply dva to all model 
1209
  - [ ] all models done
  - [x] add config crud 瀑布
  - [x] add CDN for all developer
  - [ ] deploy to dev server, run 1st open api
1208
  - [ ] add mock for all models
  - [ ] all views done
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

## How to
### run mock
open terminal1: npm run mock
open termianl2: npm run dora-proxy // no hmr, livehood
edit /mock/* files // you can add mock data
## Repo 



## 瀑布屏/展台/导视

## 瀑布屏
首页banner
bannerImg
category
  - items
    -  


##
git push origin <Tag 名字>
react router zh
https://react-guide.github.io/react-router-cn/docs/API.html#redirect