const wikiUrl={
    baidu:'https://baike.baidu.com/item/',//百度百科 后面加关键词
    wiki:'https://zh-wiki.info/wiki/'//维基百科  后面加关键词
};

function yeekit(obj){
    let originWord=document.currentWord;
    let translation=obj.translation;//数组
    let results=translation.map(i=>{
        let part=i.translated;//数组
        return part.map(n=>`<div class="doc-assistant-translate">${n['src-tokenized'].join('')}</div>
        <div class="doc-assistant-translate">${n.text}</div>`).join('')
    }).join('')
    let wiki='';
    if(!/\s/g.test(originWord)){
       wiki=`<a href='${wikiUrl.wiki}${originWord}' target='__blank'  class="doc-assistant-wiki">维基百科 ${originWord}</a>
        <a href='${wikiUrl.baidu}${originWord}' target='__blank'  class="doc-assistant-wiki">百度百科 ${originWord}</a>`
    };
    return results+wiki;
}

export default yeekit;