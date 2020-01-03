const wikiUrl={
    baidu:'https://baike.baidu.com/item/',//百度百科 后面加关键词
    wiki:'https://zh-wiki.info/wiki/'//维基百科  后面加关键词
};

function youdao(obj) {
    obj.A=obj.translation;//改名 让它优先遍历
    obj.B=obj.web;
    let parsed='';
    let wiki='';
    let basic=obj.basic;
    let query=`<div class="doc-assistant-translate">${obj.query}</div>`
    if(basic){
        //优先使用basic
        basic.A=obj.A;//把基础翻译加进来 
        basic.B=basic.explains;
        basic.C=obj.web;
        basic.D=basic.wfs;
        let basicEnum={
            exam_type:[],//考试范围
            wfs:[],//其他形式 [{wf:{name,liue}}]
            explains:[],//各个词性的所有释义  建议一个一段,
            translation:[]
        };
        let basicTEMP='';
        for(let i in basic){
            if(!basic[i]) continue;
            if(i==='A') basicTEMP+=`<div class="doc-assistant-translate">${basic[i].join(',')}</div>`;
            if(i==='B') basicTEMP+=basic[i].map(a=>`<div class="doc-assistant-translate">${a}</div>`).join('\n');
            if(i==='D') basicTEMP+=basic[i].map(a=>`<span class="doc-assistant-keyword">${a.wf.name}:${a.wf.value}</span>`).join(' ');
            if(i==='C') basicTEMP+=basic[i].map(a=>`<div class="doc-assistant-translate">${a.key}:${a.value.join()}</div>`).join('\n');
        };
        wiki=`<a href='${wikiUrl.wiki}${obj.query}' target='__blank'  class="doc-assistant-wiki">维基百科 ${obj.query}</a>
              <a href='${wikiUrl.baidu}${obj.query}' target='__blank'  class="doc-assistant-wiki">百度百科 ${obj.query}</a>`
        basicTEMP=`<div class="doc-assistant-translate-main">${basicTEMP}</div>`;
        parsed=query+basicTEMP+wiki;
    }else{
        if(!obj.translation || obj.translation.length==1 && obj.query===obj.translation[0]){
            //使用百科
            wiki=`<a href='${wikiUrl.wiki}${obj.query}' target='__blank'  class="doc-assistant-wiki">维基百科 ${obj.query}</a>
            <a href='${wikiUrl.baidu}${obj.query}' target='__blank'  class="doc-assistant-wiki">百度百科 ${obj.query}</a>`
        }
        let enums={
            web:'网络释义',
            returnPhrase:'分词数组',
            query:'查询内容',
            translation:'直译',
            webdict:'词典释义',
            speakUrl:'发音'
        };
        let mask={
            web:[[]], //{key,value}
            returnPhrase:[],//'string'
            query:'',
            Atranslation:[],//'string'
            dict:{},//url:''
            webdict:{},//url:''
        };
        let temp='';
        for(let i in obj){
            if(!obj[i]) continue;
            if(i==='A') temp+=`<div class="doc-assistant-translate">${obj[i].join(',')}</div>`;
            if(i==='B') temp+=obj[i].map(a=>`<div class="doc-assistant-translate">${a.key}:${a.value.join()}</div>`).join('\n');
        }
        temp=`<div class="doc-assistant-translate-detail">${temp}</div>`
        parsed=query+temp+wiki;
    };
    return parsed;
}

export default youdao;