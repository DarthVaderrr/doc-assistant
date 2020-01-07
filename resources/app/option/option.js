import storage from '../../src/js/extension-api/storage';
import createCssBySettings from '../../src/js/utils/createCssBySettings';
import init_settings from '../../src/js/utils/init_settings'
let context, runtime, contextName;
try {
    runtime = browser.runtime;
    context = browser;
    contextName = 'firefox';
} catch (err) {
    runtime = chrome.runtime
    context = chrome;
    contextName = 'chrome';
};
const config = {
    init_settings
};
let defaultSettings;

init();
function init() {
    storage.get('settings').then(res => {
        // console.log(res);
        let { settings } = res;
        if (settings) {
            defaultSettings = JSON.parse(settings.newValue || settings);
        } else {
            defaultSettings = { ...config.init_settings };
        };
        initDom(defaultSettings)
    }).catch(err => {
        console.error(err)
    })
};
function initDom(settings) {
    document.querySelector('.form').innerHTML = initHtml(settings);
    mapSetting();
    save(settings);
}
document.addEventListener('input', e => {
    if (e.target.getAttribute('contenteditable')) {
        checkInput(e.target)
    };
    mapSetting();
});

document.addEventListener('change', e => {
    if (e.target.getAttribute('id')) {
        mapSetting();
    };
});
document.addEventListener('click', e => {
    if (e.target.getAttribute('id') === 'save') save(defaultSettings)
    if (e.target.getAttribute('id') === 'reset') reset()
})

function save(settings) {
    storage.set(
        {
            'settings': JSON.stringify(settings)
        }).then(res => {
            // console.log(settings)
            // console.log('保存成功')
        }).catch(err => {
            alert('保存失败,sorry~')
        })
}
function reset() {
    storage.remove('settings').then(res => {
        init()
    })
}
function mapSetting() {
    for (let i of document.querySelectorAll('label+*')) {
        let id = i.getAttribute('id');
        if (i.getAttribute('type') === 'checkbox') {
            defaultSettings[id] = i.checked;
        } else {
            defaultSettings[id] = i.value || i.innerText;
        }
    };
    mapStyle(defaultSettings);
}

function checkInput(node) {
    let v = node.innerHTML;
    if (/\D/g.test(v)) {
        node.innerHTML = v.replace(/\D/g, '')
    }
    if (v - 0 > node.dataset.max) node.innerHTML = node.dataset.max;
    if (v - 0 < node.dataset.min) node.innerHTML = node.dataset.min;
}

function mapStyle(settings) {
    document.getElementById('doc_assistant_darth_vade').style.cssText = createCssBySettings(settings);;
}

function initHtml(settings) {
    return `
    <form class="browser-style form column">
    <div>
        <label for="max_word_len">翻译文本长度限制</label>
        <input id="max_word_len" step="5" value="${settings.max_word_len}" type="number" max="100" placeholder="1~100">
    </div>
    <div>
        <label for="font_size">文字大小基准</label>
        <input id="font_size" step="1" value="${settings.font_size}" type="number" min="10" max="30" placeholder="10~30">
    </div>
    <div> <label for="bg_color">选择背景色</label>
        <select name="bg_color" id="bg_color">
            <option value="RGBA(10,10,10,1)" ${/10,/.test(settings.bg_color) ? "selected" : ""}>黑色</option>
            <option value="RGBA(255,255,255,1)" ${/255,/.test(settings.bg_color) ? "selected" : ""}>白色</option>
        </select></div>
    <div>
        <label for="opacity">背景透明度</label>
        <input type="number" value="${settings.opacity}" step="0.1" max="1" placeholder="0~1" id="opacity">
    </div>
    <div>
            <label for="max_width">窗口宽度限制(%)</label>
            <input type="number" value="${settings.max_width}" step="5" min="10" max="100" placeholder="10~100" id="max_width">
        </div>
    <div>
        <label for="is_high_light">突出主要词义</label>
        <input id="is_high_light" ${settings.is_high_light === '500' ? "chekced" : ""} type="checkbox">
    </div>
    <div>
        <label for="color">选择字体颜色</label>
        <select name="color" id="color">
            <option value="RGBA(0,0,0,1)" ${/0,/.test(settings.color) ? 'selected' : ''}>黑色</option>
            <option value="RGBA(255,255,255,1)" ${/255,/.test(settings.color) ? 'selected' : ''}>白色</option>
        </select>
    </div>
    <div>
            <label for="font_opacity">字体透明度</label>
            <input type="number" value="${settings.font_opacity}" step="0.1" max="1" placeholder="0~1" id="font_opacity">
    </div>
    <div>
        <label for="provider">选择翻译方式</label>
        <select name="provider" id="provider">
            <option value="youdao" ${settings.provider === 'youdao' ? 'selected' : ''}>有道词典</option>
            <option value="baidu" ${settings.provider === 'baidu' ? 'selected' : ''}>百度翻译</option>
        </select>
    </div>
    <div>
        <label for="result">是否显示完整释义</label>
        <select name="result" id="result">
            <option value="block" ${settings.result === 'block' ? 'selected' : ''}>完全显示</option>
            <option value="none" ${settings.result === 'none' ? 'selected' : ''}>精简释义</option>
        </select>
    </div>
    <div>
        <label for="wiki">是否显示百科链接</label>
        <select name="wiki" id="wiki">
            <option value="flex" ${settings.wiki === 'flex' ? 'selected' : ''}>显示</option>
            <option value="none" ${settings.wiki === 'none' ? 'selected' : ''}>不显示</option>
        </select>
    </div>
    <br>
    <div>
            <div class="btn" id="save">保存</div>
            <div class="btn" id="reset">重置</div>
    </div>
</form>
    `
}