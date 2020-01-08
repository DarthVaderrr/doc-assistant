/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let context, runtime, contextName;
const CHROME = 'chrome', FIREFOX = 'firefox';
try {
    runtime = browser.runtime;
    context = browser;
    contextName = FIREFOX;
} catch (err) {
    runtime = chrome.runtime
    context = chrome;
    contextName = CHROME;
};
function get(key){
    return new Promise((resolve,reject)=>{
        if (contextName === CHROME) {
            try{
                context.storage.local.get(key, res => {
                    resolve(res)
                })
            }catch(err){
                reject(err)
            }
        }else{
            context.storage.local.get(key).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        }
    })
};

function set(obj){
    return new Promise((resolve,reject)=>{
        if (contextName === CHROME) {
            try{
                context.storage.local.set(obj, res => {
                    resolve(res)
                })
            }catch(err){
                reject(err)
            }
        }else{
            context.storage.local.set(obj).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        }
    })
}

function remove(keys){
    // string | string[]
    return new Promise((resolve,reject)=>{
        if (contextName === CHROME) {
            try{
                context.storage.local.remove(keys, res => {
                    resolve(res)
                })
            }catch(err){
                reject(err)
            }
        }else{
            context.storage.local.remove(keys).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        }
    })
}

/* harmony default export */ __webpack_exports__["a"] = ({
    get,
    set,
    remove
});


/***/ }),

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function createCssBySettings(settings){
    if(typeof settings === 'string') settings=JSON.parse(settings);
    settings.hover_bg_color = settings.bg_color.replace(/([0]|[0]\.\d|[1])\)$/, 0.9 + ')');
    settings.bg_color = settings.bg_color.replace(/(1\))$/, settings.opacity + ')');
    settings.color = settings.color.replace(/1\)$/, settings.font_opacity + ')');
    settings.is_high_light = settings.is_high_light ? '500' : '400';
    let json = {};
    for (let key in settings) {
        if (key === 'font_size') json['--' + key] = settings[key] + 'px'
        else if (key === 'max_width') json['--' + key] = settings[key] + 'vw'
        else json['--' + key] = settings[key]
    };
    let cssText = JSON.stringify(json).replace(/\"/g, '').replace(/(,--)/g, ";--");
    cssText = cssText.replace(/\{|\}/g, '');
    return cssText;
}

/* harmony default export */ __webpack_exports__["a"] = (createCssBySettings);

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_js_extension_api_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _src_js_utils_createCssBySettings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _src_js_utils_init_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);



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
    init_settings: _src_js_utils_init_settings__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]
};
let defaultSettings;

init();
function init() {
    _src_js_extension_api_storage__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].get('settings').then(res => {
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
    _src_js_extension_api_storage__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].set(
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
    _src_js_extension_api_storage__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].remove('settings').then(res => {
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
    document.getElementById('doc_assistant_darth_vade').style.cssText = Object(_src_js_utils_createCssBySettings__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(settings);;
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
            <option value="yeekit" ${settings.provider === 'yeekit' ? 'selected' : ''}>译云翻译</option>
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

/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    max_word_len: "40",
    font_size: "14",
    bg_color: "RGBA(10,10,10,0.5)",
    opacity: "0.5",
    is_high_light: "400",
    color: "RGBA(255,255,255,1)",
    font_opacity: "1",
    max_width: "20",
    result: "block",
    wiki:"flex",
    hover_bg_color: "rgba(0,0,0,0.9)",
    provider:'youdao'
});

/***/ })

/******/ });