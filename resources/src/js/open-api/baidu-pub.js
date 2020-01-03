import http from '../utils/http';
import MD5 from 'js-md5'
//这接口极度不稳定 常常返回空字符
const api={
    appId:'************',
    psd:'***************',
    url:'https://api.fanyi.baidu.com/api/trans/vip/translate'
};
function baidu(word,from='en',to='zh') {
    var appid = api.appId;
    var key = api.psd;
    var salt = (new Date).getTime();
    var query = word;
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var str1 = appid + query + salt + key;
    var sign = MD5(str1);
    var data = {
        q: encodeURI(query),
        appid: appid,
        salt: salt,
        from,
        to,
        sign: sign
    };
    let url=api.url;
   return http(url, 'get', data);
}
export default baidu;