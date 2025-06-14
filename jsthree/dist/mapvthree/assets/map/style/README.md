# 样式文件更新说明
由于开放平台地图样式文件一直在更新，所以当过一段时间之后，改目录下的样式文件可能会过时，导致有一些新增元素id无法匹配上最新的样式，而导致难看，可以不定期根据下面的方式来更新此目录下样式数据

1. 打开个性化样式平台并登录 https://lbsyun.baidu.com/apiconsole/custommap
2. `yanmou.json`对应`眼眸`样式，选中后查看`network`中的`mapstyle`请求，复制返回结果的`data.style`字段，更新到`yanmou.json`中，去除空格与换行
3. `default.json`对应默认样式，点击`初始化样式`后，同上拿到`mapstyle`请求内的返回结果中的`data.style`字段，更新到`default.json`中，去除空格与换行