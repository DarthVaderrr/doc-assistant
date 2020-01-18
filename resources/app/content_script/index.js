import initExtensionAction from './extension-action';
import initAppAction from './app-action';
import storage from '../../src/js/extension-api/storage';
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
    IGNORELIST:null,
    translateProvider: null, //在init_settings.js中指定默认值
    current_word: null,
    App_action:null,
    Extension_action:null,
    web_accessible_resources: {
        maxfy: "dist/img/keep.svg",
        minify: "dist/img/minify.svg",
        close: "dist/img/close.svg",
        setting: "dist/img/setting.svg",
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
        close: runtime.getURL(config.web_accessible_resources.close),
        setting:runtime.getURL(config.web_accessible_resources.setting)
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
    setConfig(setting_json);
    init();
})

/*初始化 */
function init() {
    if (window.hasRun) return false;//防止重复实例
    if(config.IGNORELIST.includes(window.location.hostname)) return false; //过滤名单
    /*防止重复实例化*/
    window.hasRun = true;
    /*防止重复实例化*/
    const App_action = initAppAction(appConfig,context,config);
    config.App_action=App_action;
    const Extension_action = initExtensionAction(appConfig, App_action, config);
    config.Extension_action=Extension_action;
    Extension_action.prepareAppDom();//插入app需要的元素
    Extension_action.rebootApp();//启动app

}
/*初始化 */

context.runtime.onMessage.addListener((message, sender, sendback) => {
    //来自popup的事件
    // console.log(message)
    if(message.action==='open'){
        config.Extension_action.rebootApp()
    }
    sendback('已启动');
})

const handleStorageChange=(storage)=>{
    let {settings}=storage;
    settings=settings.newValue || settings.oldValue ||settings;
    let settingObj=JSON.parse(settings);
    // console.log('修改设置',settingObj);
    appConfig.settingCssText=createCssBySettings(settings);
    config.Extension_action.insertSettingStyle();
    setConfig(settingObj);
    config.App_action.showToast('设置已生效',3000);
  }
//设置更新:
context.storage.onChanged.addListener(handleStorageChange);

function setConfig(obj){
    appConfig.max_select_len=obj.max_word_len-0;
    config.translateProvider=obj.provider;
    config.IGNORELIST=obj.ignoreList;
}