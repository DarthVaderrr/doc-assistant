// import baidu from './baidu.js' //接口不稳定
// import bing from './bing.js' //无法使用
// import jinshan from './jinshan.js' //无法使用
// import google from './google.js' //无法使用
// import tmxmall from './tmxmall.js' //收费
// import youdao from './youdao.js' //暂时免费  仅支持jsonp 功能不错  比较稳定
import _baidu from './baidu-pub.js' //接口不稳定

import _youdao from './youdao-pub.js' //暂时免费  仅支持jsonp 功能不错  比较稳定
export default {
    // baidu,
    // bing,
    // google,
    // jinshan,
    // tmxmall,
    // youdao,
    youdao:_youdao,
    baidu:_baidu
}