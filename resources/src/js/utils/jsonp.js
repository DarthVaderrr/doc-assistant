function jsonp(options){
    //无法直接在页面中注册回调函数  因为扩展程序和jsonp执行的上下文不同
    //解决方式: 在页面中使用script内联脚本注册回调函数  回调函数将json写入dom  扩展程序通过dom获取json;
    let {data,url,random}=options;
    data.callback='someRandomCallbackName'+random;
    let jsonContainerId='jsonContainer'+random;
    /**准备div */
    let jsonContainer=document.createElement('div');//div用来盛放jsonp返回结果
    jsonContainer.setAttribute('id',jsonContainerId);
    jsonContainer.style.display='none';//隐藏它
    document.body.appendChild(jsonContainer);

    /**注册回调 */
    let cb_ctx=document.createElement('script');//用于注册回调函数 
    cb_ctx.setAttribute('charset','UTF-8');
    cb_ctx.innerHTML=`${data.callback}=function (res){
        ${jsonContainerId}.innerHTML=JSON.stringify(res); //用data.callback命名回调函数 回调函数执行时 将res写入另一个div
    }`;
    document.documentElement.appendChild(cb_ctx);

    /**发送请求: */
    let query=queryFy(data);
    url+='?'+query;
    let req= document.createElement('script');
    req.setAttribute('charset','UTF-8');
    req.setAttribute('src',url);
    req.setAttribute('id',options.reqName);
    document.documentElement.appendChild(req);

    
    //不知道怎么监听div的内容变化事件 先用定时器实现
    req.onload=function(){
        setTimeout(() => {
            /**操作dom获取json */
            let json=document.getElementById(jsonContainerId).innerHTML;
            options.success(JSON.parse(json));
            //请求结束,移除所有dom:
            req.remove();
            jsonContainer.remove();
            cb_ctx.remove();
        }, 50);
    };

    req.onerror=options.fail;
}

function queryFy (obj) {
    if(obj===null || obj===undefined) return '';
    let str='';
    for(let i in obj){
        str+=i+'='+obj[i]+'&'
    }
    str = str.slice(0,-1)    
    return str
  }

  export default jsonp;