import sha256 from '../utils/sha256'
import jsonp from '../utils/jsonp'
// 暂时免费   仅支持jsonp
const api = {
    url: 'https://openapi.youdao.com/api',
    key: '******************************',
    id: '******'
}
function youdao(word,from='en',to='zh-CHS') {
    let random=~~(Math.random()*1000);
    let reqName='someReqName'+random;
    return new Promise((resolve,reject)=>{
        var appKey = api.id;
        var key = api.key;//注意：暴露appSecret，有被盗用造成损失的风险
        var salt = (new Date).getTime();
        var curTime = Math.round(new Date().getTime() / 1000);
        var query = word;
        // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
        var str1 = appKey + truncate(query) + salt + curTime + key;
        var sign = sha256(str1);
        return jsonp({
            url: api.url,
            data: {
                q: query,
                appKey: appKey,
                salt: salt,
                from: from,
                to: to,
                sign: sign,
                signType: "v3",
                curtime: curTime,
            },
            reqName,
            random,
            success(res){
                document.getElementById(reqName).remove()
                resolve(res);
            },
            fail(err){
                document.getElementById(reqName).remove()
                reject(err);
            }
        });
    });
}
function truncate(q) {
    var len = q.length;
    if (len <= 20) return q;
    return q.substring(0, 10) + len + q.substring(len - 10, len);
}
export default youdao
