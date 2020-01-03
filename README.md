# Doc-assistant
 + 浏览器英文文档阅读辅助插件
 + 仅支持英译中
# 本地加载方式
 + 谷歌浏览器  
   1. 依次点击三个点->更多工具->扩展程序
   2. 打开右上角开发者模式
   3. 加载已解压的扩展程序
   4. 选择manifest.json所在的目录 resources/  添加成功后 插件即可生效
   5. 点击右上角进入偏好设置
 + 火狐浏览器  
   1. 地址栏输入 about:debugging
   2. 左侧边栏->此firefox
   3. 临时载入附加组件
   4. 选择manifest.json文件  即可生效
 + 或者去扩展程序商店搜索doc-assistant并免费安装 [火狐浏览器安装地址](https://addons.mozilla.org/zh-CN/firefox/addon/doc-assistant/?src=search)
# 调试和修改
 1. cd到webpack.config.js所在目录
 2. sodu npm install 
 3. npm run build
 4. 回到添加插件的地方  点击重载按钮
 5. 调试前请自行准备好api接口所需的appid和key 
# 翻译接口说明 如何申请api
 1. 目前使用的是有道词典的接口  新用户送一百元体验金  用完需要充值  接口很稳定  功能齐全
 2. 申请方式: [有道智云](https://ai.youdao.com/index.s) 申请完自行查看接入指南
 3. 注册后将api需要的字段填到open-api/youdao-pub.js的api对象内
 4. 百度提供免费的接口 但是有频率限制,有兴趣的旁友可以尝试: [百度翻译](https://api.fanyi.baidu.com/api/trans/product/index)  此项目目录下的open-api/baidu-pub.js封装好了百度api的使用方法 自己填写id和key即可 

# 目录结构
 + node_modules  
 + resources  
  + manifest.json  ------插件描述文件  
  + app  
    - background  -------后台页面
       -  background.html  
       -  background.js  
       -  background.css  
    - content_script 
       -  app-action.js ------定义app的页面行为  
       -  extension-action.js  ------定义app的初始化,通信等行为  
       -  index.js ------content_script入口  
    - front-dom  
       -  dom.js  ------仅用于导入app样式,不含任何业务逻辑
       -  dom.less ------用于放置app的样式
    - option ------选项设置页
       - option.html  
       - option.js  
       - option.css
    - popup ------点击右上角图标弹出的小窗口
       - popup.html  ------option页面的入口在这里
       - popup.js  
       - popup.css
  + dist ------打包结果存放目录
    - content_script.js ------content_script打包结果  
       - dom.css  ------dom.less打包结果  
       - option.js ------option打包结果  
       - popup.js ------popup打包结果 
  + src  ------ 存放js和图片资源
    - css 
       - layout.css ------基础通用布局样式  
    - img  -------用到的图标  
    - js -------主要业务逻辑代码  
       - runtime  -------兼容chrome和firefox的extension_api封装  
       - index.js  ------api出口  
       - storage.js  --------本地存储api封装
    - open-api -------翻译接口api封装  
       - index.js  -------api出口  
       - youdao.js    -------有道翻译api封装  
    - translateCallback   ------- 翻译接口的回调函数
       - youdao.js   -------有道词典接口的回调函数  
       - index.js --------回调函数出口
    - utils  ------- 一些用到的项目js模块
       - createCssBySetting.js  -------将偏好设置json映射成css  
       - function-extend.js    ------- 节流与防抖函数  
       - http.js   -------- 发送请求的函数  
       - init_setting.js    --------存放默认设置的对象  
       - jsonp.js    ------- 针对有道词典封装的特殊的jsonp函数    
       - sha256.js   ------- 调翻译接口需要的哈希算法
 + package.lock.json
 + package.json
 + postcss.config.js
 + readme.md
 + webpack.config.js

# TODO
 1. 跨浏览器 [未完成]
 2. 稳定免费接口 [未完成]
 3. 支持用户偏好设置 : 颜色  位置  大小  显示内容 [完成]
 4. 实现对浏览器dom以外的支持  包括dev-tool 标题栏  剪切板等 [未完成]
