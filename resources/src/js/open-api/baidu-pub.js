import jsonp from '../utils/jsonp'
import MD5 from 'js-md5'
const api = {
    appId: 'xxxxxx',
    psd: 'xxxxx',
    url: 'https://api.fanyi.baidu.com/api/trans/vip/translate'
};

function baidu(word, from = 'en', to = 'zh') {
    let random = ~~(Math.random() * 1000);
    let reqName = 'someReqName' + random;
    return new Promise((resolve,reject)=>{
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
    return jsonp({
        url: api.url,
        data,
        reqName,
        random,
        success(res) {
            res.originWordDarthVade=word;
            document.getElementById(reqName).remove()
            resolve(res);
        },
        fail(err) {
            res.originWordDarthVade=word;
            document.getElementById(reqName).remove()
            reject(err);
        }
    });
})
}
export default baidu;