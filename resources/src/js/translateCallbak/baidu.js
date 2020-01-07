const wikiUrl={
    baidu:'https://baike.baidu.com/item/',//百度百科 后面加关键词
    wiki:'https://zh-wiki.info/wiki/'//维基百科  后面加关键词
};

function baidu(obj){
    // console.log(obj);
    let originWord=obj.originWordDarthVade;
    let query=`<div class="doc-assistant-translate">${originWord}</div>`
    let translate= obj.trans_result.map(i=>`<div class="doc-assistant-translate">${i.src}:${i.dst}</div>`).join('')
    let wiki='';
    if(!/\s/g.test(originWord)){
       wiki=`<a href='${wikiUrl.wiki}${originWord}' target='__blank'  class="doc-assistant-wiki">维基百科 ${originWord}</a>
        <a href='${wikiUrl.baidu}${originWord}' target='__blank'  class="doc-assistant-wiki">百度百科 ${originWord}</a>`
    };
    return query+translate+wiki;
}

export default baidu;