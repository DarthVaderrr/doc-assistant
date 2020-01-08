import http from '../utils/http';
const api={
   url:'https://api.yeekit.com/dotranslate.php',
   appId:'xxxx',
   key:'xxxxx'
 };
function yeekit(text,from='en',to='zh'){
    let url=api.url,
    app_kid=api.appId,
    app_key=api.key;
    let data={
        from,
        to,
        text,
        app_key,
        app_kid
    }
    return http(url,'post',data)
}

export default yeekit;