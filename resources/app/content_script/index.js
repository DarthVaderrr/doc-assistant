import initExtensionAction from './extension-action';
import initAppAction from './app-action';
import storage from '../../src/js/runtime/storage';
import createCssBySettings from '../../src/js/utils/createCssBySettings';
import init_settings from '../../src/js/utils/init_settings';
let context, runtime;

try {
    runtime = browser.runtime;
    context = browser;
} catch (err) {
    context = chrome;
    runtime = chrome.runtime;
};

/*初始化配置 */
const config = {
    translateProvider: 'youdao',
    current_word: null,
    App_action:null,
    Extension_action:null,
    web_accessible_resources: {
        maxfy: "src/img/maxfy.svg",
        minify: "src/img/minify.svg",
        close: "src/img/close.svg",
        css: "dist/dom.css",
        script: "dist/dom.js"
    }
};
const appConfig = {
    max_select_len:40,
    settingCssText:null,
    app: document.createElement('div'),
    options: document.createElement('nav'),
    container: document.createElement('div'),
    msgContainer: document.createElement('div'),
    style: document.createElement('link'),
    script: document.createElement('script'),
    settingStyle:document.createElement('style'),
    id: 'doc_assistant_darth_vade',
    containerId: 'doc_assistant_container',
    msgContainerId: 'doc_assistant_msg',
    optionsId: 'doc_assistant_options',
    scriptId: 'doc_assistant_script',
    settingStyleId:'doc_assistant_settingStyle',
    scriptSrc: runtime.getURL(config.web_accessible_resources.script),
    cssSrc: runtime.getURL(config.web_accessible_resources.css),
    icons: {
        minify: runtime.getURL(config.web_accessible_resources.minify),
        maxfy: runtime.getURL(config.web_accessible_resources.maxfy),
        close: runtime.getURL(config.web_accessible_resources.close)
    },
    app_state: 'empty', //mini closed max empty
};
/**
 * -------禁止在appConfig以外使用createElement,以保证所有插入页面的元素都是可控的-------
 */

/*初始化配置 */

//初始化:
storage.get('settings').then(res=>{
    // console.log('初始化',res)
    let setting_json;
    let settings=res.settings;
    if(settings){
        setting_json=JSON.parse(settings.newValue||settings.oldValue||settings);

    }else{
        setting_json=init_settings;//使用默认配置
    }
    appConfig.settingCssText=createCssBySettings(setting_json);
    getAndSetMaxLenBySettings(setting_json);
    init();
})

/*初始化 */
function init() {
    if (window.hasRun) return false;//防止重复实例
    /*防止重复实例化*/
    window.hasRun = true;
    /*防止重复实例化*/
    const App_action = initAppAction(appConfig);
    config.App_action=App_action;
    const Extension_action = initExtensionAction(appConfig, App_action, config);
    config.Extension_action=Extension_action;

    Extension_action.prepareAppDom();//插入app需要的元素
    Extension_action.startWatch();//开始监听选取
    App_action.watchOptionClick();//监听菜单
    App_action.watchClickOutside();//监听app外点击
    App_action.watchAppDrag();//监听拖拽

}
/*初始化 */

context.runtime.onMessage.addListener((message, sender, sendback) => {
    //来自popup的事件
    // console.log(message)
    sendback('hi')
})

const handleStorageChange=(storage)=>{
    let {settings}=storage;
    settings=settings.newValue || settings.oldValue ||settings;
    // console.log('修改设置',storage)
    appConfig.settingCssText=createCssBySettings(settings);
    config.Extension_action.insertSettingStyle();
    getAndSetMaxLenBySettings(settings);
    config.App_action.showToast('设置已生效',3000);
  }
//设置更新:
context.storage.onChanged.addListener(handleStorageChange);

function getAndSetMaxLenBySettings(settings){
    if(typeof settings === 'object') {
        appConfig.max_select_len=settings.max_word_len-0;
    }else{
        /"max_word_len":"(\d+)"/.test(settings);
        appConfig.max_select_len=RegExp.$1-0;//从json中提取max_len
    }
}