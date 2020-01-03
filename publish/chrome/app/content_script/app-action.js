const wikiUrl = {
    baidu: 'https://baike.baidu.com/item/',//百度百科 后面加关键词
    wiki: 'https://zh-wiki.info/wiki/'//维基百科  后面加关键词
};
export default initAppAction;

function initAppAction (appConfig) {
    let { app, container } = appConfig;
    
    const optionClickHandler=function (e) {
        if (e.target.id === 'doc_assistant_close') setState('closed')
        if (e.target.id === 'doc_assistant_minify') setState('mini')
        if (e.target.id === 'doc_assistant_maxfy') setState('max')
    }
    
    function setContent(parsedHTML) {
        container.innerHTML = parsedHTML;
    }
    function setState(state) {
        app.dataset.state = state;
        appConfig.app_state = state;
    }
    //展示信息
    function showToast(msg,duration=1000) {
        maxfy();
        appConfig.msgContainer.innerHTML='';
        appConfig.msgContainer.innerHTML = msg;
        setTimeout(() => {
            appConfig.msgContainer.innerHTML='';
        }, duration);
    }

    function minify() {
        setState('mini');
    };
    function maxfy() {
        setState('max');
    }
    function loading() {
        container.innerHTML = "<div class='doc_assistant_loading'></div>"
    }
    function hideLoading(){
        setContent('')
    }
    //直接展示wiki
    function setWiki(word) {
        setState('max');
        let wiki = `
            <div class='doc-assistant-wiki-translate'>${word}</div>
            <a href='${wikiUrl.wiki}${word}' target='__blank'  class="doc-assistant-wiki">维基百科 ${word}</a>
            <a href='${wikiUrl.baidu}${word}' target='__blank'  class="doc-assistant-wiki">百度百科 ${word}</a>`;
        setContent(wiki);
    }
    function watchOptionClick() {
        document.getElementById('doc_assistant_darth_vade').addEventListener('click', optionClickHandler);
    };
    function stopWatchOptionClick(){
        document.getElementById('doc_assistant_darth_vade').removeEventListener('click',optionClickHandler);
    }
    function watchClickOutside(){
        document.addEventListener('click',e=>{
           let target=e.target;
           let isClickIn=false;
           while(target){
               if(target===document.documentElement) break;
               if(target.getAttribute('id')==='doc_assistant_darth_vade'){
                isClickIn=true;
                   break;
               };
               target=target.parentNode;
           };
           if(!isClickIn) minify()
        })
    }
    function watchAppDrag(){
        let x,y,startx,starty;
        //火狐中pageX在落点时为0  用screenX
        document.getElementById('doc_assistant_darth_vade').addEventListener('dragstart',function(e){
            e.target.style.opacity='0.5';
            [x,y]=[e.target.offsetLeft,e.target.offsetTop];
            [startx,starty]=[e.screenX,e.screenY];
    
        });
        document.getElementById('doc_assistant_darth_vade').addEventListener('dragend',function(e){
            let app=e.target;
            let [_x,_y]=[e.screenX-startx,e.screenY-starty];
            [x,y]=[x+_x,y+_y];
            if(x<10) x=0;
            if(x>(window.innerWidth)) x=window.innerWidth-app.offsetWidth;
            if(y<10) y=0;
            if(y>(window.innerHeight-app.offsetHeight)) y=window.innerHeight-app.offsetHeight;
            app.style.cssText = `--top:${y}px;--left:${x}px;opacity:1`
        });
    }

    function enableResize(){
            //允许用户缩放
    }
    return {
        setContent,
        setState,
        loading,
        minify,
        maxfy,
        setWiki,
        watchOptionClick,
        stopWatchOptionClick,
        showToast,
        hideLoading,
        watchClickOutside,
        watchAppDrag,
        enableResize
    };
}
