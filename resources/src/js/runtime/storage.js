let context, runtime, contextName;
const chromeName = 'chrome', firefoxName = 'firefox';
try {
    runtime = browser.runtime;
    context = browser;
    contextName = 'firefox';
} catch (err) {
    runtime = chrome.runtime
    context = chrome;
    contextName = 'chrome';
};
function get(key){
    return new Promise((resolve,reject)=>{
        if (contextName === 'chrome') {
            try{
                context.storage.local.get(key, res => {
                    resolve(res)
                })
            }catch(err){
                reject(err)
            }
        }else{
            context.storage.local.get(key).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        }
    })
};

function set(obj){
    return new Promise((resolve,reject)=>{
        if (contextName === 'chrome') {
            try{
                context.storage.local.set(obj, res => {
                    resolve(res)
                })
            }catch(err){
                reject(err)
            }
        }else{
            context.storage.local.set(obj).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        }
    })
}

function remove(keys){
    // string | string[]
    return new Promise((resolve,reject)=>{
        if (contextName === 'chrome') {
            try{
                context.storage.local.remove(keys, res => {
                    resolve(res)
                })
            }catch(err){
                reject(err)
            }
        }else{
            context.storage.local.remove(keys).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        }
    })
}

export default{
    get,
    set,
    remove
}
