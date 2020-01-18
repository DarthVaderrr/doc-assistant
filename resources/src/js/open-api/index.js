import baidu from './baidu.js' //请将这行注释掉  用baidu-pub
// import baidu from './baidu-pub.js' // 百度接口请用这行
import yeekit from './yeekit'
// import yeekit from './yeekit-pub'
// import bing from './bing.js' //无法使用
// import jinshan from './jinshan.js' //无法使用
// import google from './google.js' //无法使用
// import tmxmall from './tmxmall.js' //收费
import youdao from './youdao.js' //请将这行注释掉  用youdao-pub
// import youdao from './youdao-pub.js' // 有道词典接口请用这行

/**
 * 由于模块内包含真实的api账号密码 所以真正的模块我没上传  而是上传了 带有后缀 -pub的模块模板  
 * baidu.js和baidu-pub.js封装内容完全一致 只是账号密码留空  如果需要使用对应的api 请自己申请appid填入模块的api字段中
 */
export default {
    baidu,
    // bing,
    // google,
    // jinshan,
    // tmxmall,
    youdao,
    yeekit
}