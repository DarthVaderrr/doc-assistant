function http(url,method='get',data=null,ops,form=true){
    let xhr=new XMLHttpRequest();
    return new Promise((resolve,reject)=>{
        if(method==='get') url+='?'+queryFy(data);
        xhr.open(method,url);
        if(ops){
            for(let i in ops){
            xhr.setRequestHeader(i, ops[i]) 
            }
        }
        if(form){
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded') 
            data=queryFy(data)
        }
        if(method==='get'){
            xhr.send(null);
        }else{
            xhr.send(data);
        }
        xhr.onreadystatechange=e=>{
            // console.log(xhr)
            if(xhr.readyState===4){
                if((xhr.status >=200 && xhr.status < 300) || xhr.status == 304){
                    resolve(JSON.parse(xhr.responseText))
                }else{
                    reject(xhr.responseText)
                }
            }
        }
    })
};
function queryFy (obj) {
    if(obj===null || obj===undefined) return '';
    let str='';
    for(let i in obj){
        str+=i+'='+obj[i]+'&'
    }
    str = str.slice(0,-1)    
    return str
  }
module.exports=http;