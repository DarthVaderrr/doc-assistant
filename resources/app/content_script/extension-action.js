import { debounce } from '../../src/js/utils/function-extend.js';
import translateAPI from '../../src/js/open-api/index.js';
import translateSuccessCallbacks from '../../src/js/translateCallbak/index.js';

export default initExtensionAction;

function initExtensionAction(appConfig, App_action, config) {
    //选取事件的回调函数:
    const originHandler = function () {
        //先判断app是否已被用户通过dom按钮关闭:
        if (appConfig.app_state === 'closed') return shutDownApp();
        let current_word = config.current_word;
        var new_word = window.getSelection().toString();
        if (current_word === new_word || !/[A-z]+|\S/g.test(new_word) || new_word.length > appConfig.max_select_len) return; //过滤无效选取
        if (/[\u4E00-\u9FEF]/g.test(new_word)) {
            if(new_word.length<=8){
                return App_action.setWiki(new_word);//汉字不翻译 直接wiki
            }else{
                return;
            }
        }
        config.current_word = new_word;//记录去重
        document.currentWord=config.current_word;//全局记录
        handleWord(new_word);
    }
    const selectionEventHandler = debounce(originHandler, 300, false);//防抖
    config.selectionEventHandler=selectionEventHandler;//存值,以便解除事件
    //准备app的dom模板:
    function prepareAppDom() { 
        var { container, style, app, options, msgContainer,script,settingStyle } = appConfig;
        const parsedOptions =
       `<a href="javascript:;" title='关闭' 
        style='background-image:url(${appConfig.icons.close})'
        id="doc_assistant_close" class="doc_assistant_option"></a>
        <a href="javascript:;" title='隐藏' 
        style='background-image:url(${appConfig.icons.minify})'
        id="doc_assistant_minify" class="doc_assistant_option"></a>
        <a href="javascript:;" title='保持显示' 
        style='background-image:url(${appConfig.icons.maxfy})'
        id="doc_assistant_maxfy" class="doc_assistant_option"></a>`;

        app.setAttribute('id', appConfig.id);
        App_action.setState(appConfig.app_state);

        options.setAttribute('id', appConfig.optionsId);//按钮
        container.setAttribute('id', appConfig.containerId);//内容
        msgContainer.setAttribute('id', appConfig.msgContainerId);//消息
        script.setAttribute('id', appConfig.scriptId);//script
        settingStyle.setAttribute('id',appConfig.settingStyleId)

        app.setAttribute('style','--top:100px;--left:20px');
        options.innerHTML = parsedOptions;
        appendStyleLink(style); //插入link 

        settingStyle.setAttribute('rel','stylesheet');
        document.head.appendChild(settingStyle);
        insertSettingStyle();//插入设置的样式
        
        app.appendChild(options);
        app.appendChild(container);
        app.appendChild(msgContainer);
        document.body.appendChild(app);
        appendScript(script);//插入脚本

        watchMouseOver(options,app);//监听悬浮事件 添加draggable
    }
    function insertSettingStyle(){
        appConfig.settingStyle.innerHTML=`#doc_assistant_darth_vade{${appConfig.settingCssText}}`;
    }
    function appendScript(script){
        script.setAttribute('src',appConfig.scriptSrc);
        document.documentElement.appendChild(script);
    }
    function appendStyleLink(style){
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', appConfig.cssSrc);
        document.head.appendChild(style);
    }
    //监听鼠标悬浮事件
    function watchMouseOver(options,app){
        options.addEventListener('mouseenter',e=>{
            app.setAttribute('draggable', 'true');
        });
        options.addEventListener('mouseleave',e=>{
            app.removeAttribute('draggable');
        });
    }
    //监听app事件 
    function startWatch() {
        document.addEventListener('selectionchange', selectionEventHandler);//监听选取
        App_action.watchOptionClick();//监听选项栏
        App_action.watchAppDrag();//监听拖动
        // App_action.watchClickOutside();//监听外部点击 这个用不上了

    }
    //停止监听app事件
    function stopWatch() {
        document.removeEventListener('selectionchange',config.selectionEventHandler);
        App_action.stopWatchOptionClick();
        // App_action.stopWatchClickOutside();
        App_action.stopWatchDrag();
    }

    //翻译
    function translate(word) {
        App_action.loading()
        return translateAPI[config.translateProvider](word);
    }

    //展示翻译结果
    function appendResult(res) {
        App_action.setState('max')
        let parsedHTML = translateSuccessCallbacks[config.translateProvider](res);//根据翻译源选择回调函数
        App_action.setContent(parsedHTML);
    }

    //处理单词：
    function handleWord(word) {
        translate(word).then((res) => {
            appendResult(res)
        }).catch(err => {
            console.error(err)
            App_action.hideLoading();
            App_action.showToast('翻译失败',2000)
        })
    };
    function shutDownApp() {
        stopWatch();
        App_action.setState('closed');
    }
    function rebootApp() {
        App_action.showToast('文档助手已启用',1000);
        setTimeout(() => {
            App_action.setState('mini');
        }, 1000);
        startWatch();
    }

    return {
        translate,
        startWatch,
        stopWatch,
        shutDownApp,
        appendResult,
        prepareAppDom,
        handleWord,
        rebootApp,
        insertSettingStyle
    }
}