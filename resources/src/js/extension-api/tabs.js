let context, runtime, contextName;
const CHROME = 'chrome', FIREFOX = 'firefox';
try {
    runtime = browser.runtime;
    context = browser;
    contextName = FIREFOX;
} catch (err) {
    runtime = chrome.runtime
    context = chrome;
    contextName = CHROME;
};

function query(options){
    return new Promise((resolve,reject)=>{
        if(contextName===CHROME){
            try{
                context.tabs.query(options,tabs=>{
                    resolve(tabs)
                })
            }catch(err){
                reject(err)
            }
        }else{
            context.tabs.query(options).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        }
    })
}

function sendMessage(id,msg){
    return new Promise((resolve,reject)=>{
        if(contextName===CHROME){
            try{
                context.tabs.sendMessage(id,msg,res=>{
                    resolve(res)
                })
            }catch(err){
                reject(err)
            }
        }else{
            context.tabs.sendMessage(id,msg).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        }
    })
}

export default {
    query,
    sendMessage
}