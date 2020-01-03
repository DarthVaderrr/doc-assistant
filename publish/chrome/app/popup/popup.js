let context,runtime,contextName;
const chromeName='chrome',firefoxName='firefox';
try {
  runtime = browser.runtime;
  context = browser;
  contextName='firefox';
} catch (err) {
  runtime=chrome.runtime
  context = chrome;
  contextName='chrome';
};

excuteContentScript();//这个不管用户点不点图标都会执行  然后执行content_scripts 

context.tabs.query({active: true, currentWindow: true}, function(tabs){
  context.tabs.sendMessage(tabs[0].id, {msg:'hello'}, function(response) {
      //  console.log(response)
  });  
});

context.storage.onChanged.addListener((storage)=>{
  // console.log(storage.userSettingCss)
});

document.getElementById('open_setting').addEventListener('click',e=>{
  runtime.openOptionsPage();//打开设置面板
})

function sendMsgFirefox(){
  runtime.sendMessage({
    msg:'hello'
  }).then(res=>{
    console.log(res)
  })
}
function sendMsgChrome(id){
  runtime.sendMessage({
    msg:"hello"
  },res=>{
    console.log(res)
  })
}

function excuteContentScript() {
  try{
    _chrome();
  }catch(err){
    console.error(err);
    _firefox()
  }
  function _chrome() {
      context.tabs.executeScript(
        { file: "/content_scripts/extension.js" },
        (res)=>{
          console.log('running in chrome')
        }
      )
  };
  function _firefox() {
    context.tabs.executeScript({ file: "/content_scripts/extension.js" })
      .then((res) => {
        console.log('runing in firefox')
      })
      .catch(_chrome)
  }
};

