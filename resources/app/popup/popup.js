import tabs from '../../src/js/extension-api/tabs'
let context, runtime, contextName;
const CHROME = 'chrome', FIREFOX = 'firefox';
try {
  runtime = browser.runtime;
  context = browser;
  contextName = CHROME;
} catch (err) {
  runtime = chrome.runtime
  context = chrome;
  contextName = FIREFOX;
};

excuteContentScript();


context.storage.onChanged.addListener((storage) => {
  // console.log(storage.userSettingCss)
});


//文档内的点击事件 统一托管:
document.addEventListener('click', e => {
  if(e.target.getAttribute('id')==='open_setting') runtime.openOptionsPage();//打开设置面板
  if(e.target.getAttribute('id')==='reboot') rebootApp();
})


function rebootApp(){
  tabs.query({ active: true, currentWindow: true }).then(
    function (tabList) {
      tabs.sendMessage(tabList[0].id, { action: 'open' }).then(response => {
        //  console.log(response)
      }).catch(err => {
        console.error(err)
      })
    }).catch(err => {
      console.error(err)
    })
}


function excuteContentScript() {
  try {
    _chrome();
  } catch (err) {
    console.error(err);
    _firefox()
  }
  function _chrome() {
    context.tabs.executeScript(
      { file: "/content_scripts/extension.js" },
      (res) => {
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

