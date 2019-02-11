## 如何后台配置

### 开发环境操作(如需生产环境配置, 请替换 ip 地址)

1. 登录 http://47.96.181.54/admin.html#/view-config/manage/detail/new

   1.1 账户 admin 密码 admin

2. 选择`类型`, 配置视图

![img](https://bookstore-public.oss-cn-hangzhou.aliyuncs.com/config-new.png)

3. 视图配置完毕后, 进入 http://47.96.181.54/admin.html#/terminal/manage


    3.1 新建终端

    3.2 绑定终端视图

![img-2](https://bookstore-public.oss-cn-hangzhou.aliyuncs.com/terminal.png)

4.  绑定完毕后, 得到对应终端 id, 可以分别获取如下数据
   ```
   /open/v1/pubu?corpId&clientId={终端id}
   /open/v1/zhantai?corpId&clientId={终端id}
   /open/v1/daoshi?corpId&clientId={终端id}
   ```
   对应视图地址分别是
   ```
   /page/pubu?orgId=1&clientId=4
   /page/zhantai?orgId=1&clientId=4
   /page/daoshi?orgId=1&clientId=4
   ```
