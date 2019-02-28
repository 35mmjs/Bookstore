
## API
## 服务器相关
服务器
`47.96.75.202`
协议
`http`
## 接口鉴权约定

## 接口格式
正常数据接口
```
{
  success: true,
  data: {},
  msg: ''
}
```
错误异常返回
{
  success:false,
  data: {},
  msg: '未能找到指定用户'
}

## 终端接口(配置)

### 获取导视数据
// 接口定义及方法

GET `/open/v1/daoshi?orgId=xxx&clientId=xxx`

#### 入参
```
{
    // {String} 当前图书馆的企业 ID
    "orgId": "",

    // {String} 当前展台的 ID（每一个展台上放的书可能都不一样，因此需要传递 ID）
    "clientId": "",
}
```

#### 返回数据
```
{ 
  type: '1' //类型
  note: '导视' //备注
  books:  [
    {
      ...bookInfo // 书本的详情信息，详见通用接口
    }
  ]
}
```

### 获取展台数据
// 接口定义及方法

GET `/open/v1/zhantai?orgId=xxx&clientId=xxx`

#### 入参
```
{
    // {String} 当前图书馆的企业 ID
    "orgId": "",

    // {String} 当前展台的 ID（每一个展台上放的书可能都不一样，因此需要传递 ID）
    "clientId": "",
}
```

#### 返回数据
```
{ 
  type: '2' //类型
  note: '展台' //备注
  books:  [
    {
      ...bookInfo // 书本的详情信息，详见通用接口
    }
  ]
}
```

### 获取瀑布列表

GET `/open/v1/pubu`

#### 入参
copid: 企业 ID

#### 返回数据
Response: []

// 具体数据格式
```
[
  // Channel 栏目
  {
    // 分类 ID
    id: "",

    // Banner 配置项
    banner: {
      // {String} 图片地址
      src: "",
    },

    // {Array} 书列表
    books: [
      {
        // {String} 图书 ID
        id: "",

        // {String} 图片 CDN 地址
        cover: "", 

        // {String} 图书名称
        name: "",

        // {String} 作者信息
        author: "",

        // {String} 当前价格
        price: "", // 当前价格

        // {Number} 评分
        score: "",
      }
    ]
  }
]

// mock

```

### 排行榜相关(0224新增)
#### 设计图

只需要知道row和colum2个参数就可以定位某个具体的pad
进入页面之前, 会有入口页面提供下拉选择入参,比如orgId, clientId 之类
前端需要接口的入参写死在本地存储
![design](https://gw.alipayobjects.com/mdn/iot_box_me/afts/img/A*LHEIR4TRNSIAAAAAAAAAAABjARQnAQ)
#### 获取排行分类

GET `/open/v1/paihang/catalog`

参数
  - orgId 门店 id
  - clientId 客户端 id
  - navId 排行榜会有 2 栏，因此需要频道 id
  
返回结果
```
[
  {
    name: "人文科学",
    id: "1231313",
  },
  {
    ...
  }
]
```
#### 更新当前频道的分类 id
GET `/open/v1/paihang/update`

参数
  - orgId
  - clientId
  - navId 排行榜id
  - catalogId 对应的分类 id

返回结果
```
{
  success: true,
  data: '',
}
```

#### 获取选中的排行分类的书本详情, 轮询接口
描述
  每个pad的位置固定, 即对应了排行的rank, 每次轮询后台接口(暂定轮询每3个一次), 返回什么显示什么


GET `/open/v1/paihang/pad/detail`

参数
  - orgId
  - clientId
  - navId 排行榜id
  - rankId 排行序列 e.g. 1,2,3,4 目前固定

返回结果
```
{
  success: true,
  data: {
    bookInfo..  .
  }
}
```

### 搜索图书(关键词)

GET `/open/v1/book/search?keyword=xxx`

// 返回数据
Response: {}

// 具体数据格式
```
[
  {
    ...bookInfo // 书本的详情信息，详见通用接口
  }
]
```

### 获取图详详情通过ISBN或者SPBS

GET `/open/v1/book?isbn=xxxx`

GET `/open/v1/book?spbs=xxxx`

// 返回数据
```
{
  success: true,
  data: {
    ...bookInfo
  }  
}    

```
// 具体数据格式


### 获取推荐书目通过ISBN或者SPBS

GET `/open/v1/book/recommend?isbn=xxx`

GET `/open/v1/book/recommend?spbs=xxx`


// 返回数据
<!-- 
> 由于排行榜数据未返回更多图书详情, 需要通过图书详情接口, 依次获取每个数的封面和具体信息, 也即是在展示推荐的时候, 一个一个异步loading, 但是在点进去的时候, 详情是秒开的(已经异步获取)
 -->
Response: {}

// 具体数据格式
```
[
  {
    ...bookInfo
  },
]
```


## 其他

### bookInfo 格式如下

```
{
  // {String} 图书 商品标识 spbs
  spbs: "",

  // {String} 图书 ISBN
  isbn: "",

  // {String} 图片 CDN 地址
  cover: "", 

  // {String} 图书名称
  name: "",

  // {String} 作者信息
  author: "",

  // {Array} 推荐者
  recommender: []

  // {String} 售价 
  price: "", // 当前价格

  // {String} 定价
  pricing: "",

  // {Number} 评分
  score: "",

  // {Number} 评论
  commands: "",

  // {String} 内容简介
  intro: "",

  // {String} 作者简介
  authorInfo: "",

  // {String} 目录
  catalog: "",

  // {Number} ISBN
  isbn: "",

  // {String} 开本
  pageType: "",

  // {Number} 页数
  pageNumber: "",

  // {String} 版本
  version: "",

  // {String} 出版社
  publish: "",

  // {String} 书架号
  bookshelf: "",

  // {String} 二维码
  qrcode: "",
}
```