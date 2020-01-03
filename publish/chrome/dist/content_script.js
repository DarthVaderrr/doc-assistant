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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function http(url,method='get',data=null,ops,form=true){
    let xhr=new XMLHttpRequest();
    return new Promise((resolve,reject)=>{
        if(method==='get') url+='?'+queryFy(data);
        xhr.open(method,url);
        if(ops){
            for(let i in ops){
            xhr.setRequestHeader(i, ops[i]) 
            }
        }
        if(form){
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded') 
            data=queryFy(data)
        }
        if(method==='get'){
            xhr.send(null);
        }else{
            xhr.send(data);
        }
        xhr.onreadystatechange=e=>{
            if(xhr.readyState===4){
                if((xhr.status >=200 && xhr.status < 300) || xhr.status == 304){
                    resolve(JSON.parse(xhr.responseText))
                }else{
                    reject(xhr.responseText)
                }
            }
        }
    })
};
function queryFy (obj) {
    if(obj===null || obj===undefined) return '';
    let str='';
    for(let i in obj){
        str+=i+'='+obj[i]+'&'
    }
    str = str.slice(0,-1)    
    return str
  }
module.exports=http;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let context, runtime, contextName;
const chromeName = 'chrome', firefoxName = 'firefox';
try {
    runtime = browser.runtime;
    context = browser;
    contextName = 'firefox';
} catch (err) {
    runtime = chrome.runtime
    context = chrome;
    contextName = 'chrome';
};
function get(key){
    return new Promise((resolve,reject)=>{
        if (contextName === 'chrome') {
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
        if (contextName === 'chrome') {
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
        if (contextName === 'chrome') {
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function createCssBySettings(settings){
    if(typeof settings === 'string') settings=JSON.parse(settings);
    settings.hover_bg_color = settings.bg_color.replace(/(1\))$/, 0.9 + ')');
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
/* 3 */
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
    hover_bg_color: "rgba(0,0,0,0.9)"
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * 来自 @Polaris_tl [https://blog.csdn.net/Polaris_tl/article/details/99300458]
 * 防抖 函数会在延迟结束后再执行
 * 并且在延迟结束前的每次重复触发都会重置延迟时间,可以用于防止鼠标连击或屏幕滚动/resize等高频dom事件
 * @param {function} fn 不能是箭头函数
 * @param {number}  timeout 延迟时间 默认300ms
 * @param {boolean}  isImmediate  是否立即执行 默认true
 * @returns {function}
 */
function debounce(fn, wait = 500, isImmediate = true) {
    var timerId = null;
    var flag = true;
    if (isImmediate) {
        return function () {
            clearTimeout(timerId);
            if (flag) {
                fn.apply(this, arguments);
                flag = false
            }
            timerId = setTimeout(() => { flag = true }, wait)
        }
    }
    return function () {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(this, arguments)
        }, wait)
    }
}
/**
 * 来自 @Polaris_tl [https://blog.csdn.net/Polaris_tl/article/details/99300458]
 * 节流：稀释函数的触发频率  强制让事件每隔300ms响应一次
 * 例如 在窗口resize时 首次捕获到事件会直接执行函数  然后每隔300ms才会响应一次事件
 * @param {function} fn 不能是箭头函数
 * @param {number} timeout 间隔时间
 * @param {boolean} isImmediate 首次触发是否立即执行
 */
function throttle(fn, wait = 500, isImmediate = true) {
    var flag = true;
    var timer = null;
    if (isImmediate) {
        return function () {
            if (flag) {
                fn.apply(this, arguments);
                flag = false;
                timer = setTimeout(() => {
                    flag = true
                }, wait)
            }
        }
    }
    return function () {
        if (flag) {
            flag = false
            var timer = setTimeout(() => {
                fn.apply(this, arguments)
                flag = true
            }, wait)
        }
    }
}

module.exports={
    debounce,
    throttle
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_MD5_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_MD5_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD =  true && __webpack_require__(6);
  var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [128, 32768, 8388608, -2147483648];
  var SHIFT = [0, 8, 16, 24];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'buffer', 'arrayBuffer', 'base64'];
  var BASE64_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

  var blocks = [], buffer8;
  if (ARRAY_BUFFER) {
    var buffer = new ArrayBuffer(68);
    buffer8 = new Uint8Array(buffer);
    blocks = new Uint32Array(buffer);
  }

  if (root.JS_MD5_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  /**
   * @method hex
   * @memberof md5
   * @description Output hash as hex string
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {String} Hex string
   * @example
   * md5.hex('The quick brown fox jumps over the lazy dog');
   * // equal to
   * md5('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method digest
   * @memberof md5
   * @description Output hash as bytes array
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Array} Bytes array
   * @example
   * md5.digest('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method array
   * @memberof md5
   * @description Output hash as bytes array
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Array} Bytes array
   * @example
   * md5.array('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method arrayBuffer
   * @memberof md5
   * @description Output hash as ArrayBuffer
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {ArrayBuffer} ArrayBuffer
   * @example
   * md5.arrayBuffer('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method buffer
   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
   * @memberof md5
   * @description Output hash as ArrayBuffer
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {ArrayBuffer} ArrayBuffer
   * @example
   * md5.buffer('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method base64
   * @memberof md5
   * @description Output hash as base64 string
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {String} base64 string
   * @example
   * md5.base64('The quick brown fox jumps over the lazy dog');
   */
  var createOutputMethod = function (outputType) {
    return function (message) {
      return new Md5(true).update(message)[outputType]();
    };
  };

  /**
   * @method create
   * @memberof md5
   * @description Create Md5 object
   * @returns {Md5} Md5 object.
   * @example
   * var hash = md5.create();
   */
  /**
   * @method update
   * @memberof md5
   * @description Create and update Md5 object
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Md5} Md5 object.
   * @example
   * var hash = md5.update('The quick brown fox jumps over the lazy dog');
   * // equal to
   * var hash = md5.create();
   * hash.update('The quick brown fox jumps over the lazy dog');
   */
  var createMethod = function () {
    var method = createOutputMethod('hex');
    if (NODE_JS) {
      method = nodeWrap(method);
    }
    method.create = function () {
      return new Md5();
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type);
    }
    return method;
  };

  var nodeWrap = function (method) {
    var crypto = eval("require('crypto')");
    var Buffer = eval("require('buffer').Buffer");
    var nodeMethod = function (message) {
      if (typeof message === 'string') {
        return crypto.createHash('md5').update(message, 'utf8').digest('hex');
      } else {
        if (message === null || message === undefined) {
          throw ERROR;
        } else if (message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        }
      }
      if (Array.isArray(message) || ArrayBuffer.isView(message) ||
        message.constructor === Buffer) {
        return crypto.createHash('md5').update(new Buffer(message)).digest('hex');
      } else {
        return method(message);
      }
    };
    return nodeMethod;
  };

  /**
   * Md5 class
   * @class Md5
   * @description This is internal class.
   * @see {@link md5.create}
   */
  function Md5(sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
      this.buffer8 = buffer8;
    } else {
      if (ARRAY_BUFFER) {
        var buffer = new ArrayBuffer(68);
        this.buffer8 = new Uint8Array(buffer);
        this.blocks = new Uint32Array(buffer);
      } else {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    }
    this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
  }

  /**
   * @method update
   * @memberof Md5
   * @instance
   * @description Update hash
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Md5} Md5 object.
   * @see {@link md5.update}
   */
  Md5.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }

    var notString, type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw ERROR;
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw ERROR;
          }
        }
      } else {
        throw ERROR;
      }
      notString = true;
    }
    var code, index = 0, i, length = message.length, blocks = this.blocks;
    var buffer8 = this.buffer8;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = blocks[16];
        blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }

      if (notString) {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            buffer8[i++] = message[index];
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
          }
        }
      } else {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              buffer8[i++] = code;
            } else if (code < 0x800) {
              buffer8[i++] = 0xc0 | (code >> 6);
              buffer8[i++] = 0x80 | (code & 0x3f);
            } else if (code < 0xd800 || code >= 0xe000) {
              buffer8[i++] = 0xe0 | (code >> 12);
              buffer8[i++] = 0x80 | ((code >> 6) & 0x3f);
              buffer8[i++] = 0x80 | (code & 0x3f);
            } else {
              code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
              buffer8[i++] = 0xf0 | (code >> 18);
              buffer8[i++] = 0x80 | ((code >> 12) & 0x3f);
              buffer8[i++] = 0x80 | ((code >> 6) & 0x3f);
              buffer8[i++] = 0x80 | (code & 0x3f);
            }
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              blocks[i >> 2] |= code << SHIFT[i++ & 3];
            } else if (code < 0x800) {
              blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else if (code < 0xd800 || code >= 0xe000) {
              blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else {
              code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
              blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            }
          }
        }
      }
      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };

  Md5.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex;
    blocks[i >> 2] |= EXTRA[i & 3];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = blocks[16];
      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.bytes << 3;
    blocks[15] = this.hBytes << 3 | this.bytes >>> 29;
    this.hash();
  };

  Md5.prototype.hash = function () {
    var a, b, c, d, bc, da, blocks = this.blocks;

    if (this.first) {
      a = blocks[0] - 680876937;
      a = (a << 7 | a >>> 25) - 271733879 << 0;
      d = (-1732584194 ^ a & 2004318071) + blocks[1] - 117830708;
      d = (d << 12 | d >>> 20) + a << 0;
      c = (-271733879 ^ (d & (a ^ -271733879))) + blocks[2] - 1126478375;
      c = (c << 17 | c >>> 15) + d << 0;
      b = (a ^ (c & (d ^ a))) + blocks[3] - 1316259209;
      b = (b << 22 | b >>> 10) + c << 0;
    } else {
      a = this.h0;
      b = this.h1;
      c = this.h2;
      d = this.h3;
      a += (d ^ (b & (c ^ d))) + blocks[0] - 680876936;
      a = (a << 7 | a >>> 25) + b << 0;
      d += (c ^ (a & (b ^ c))) + blocks[1] - 389564586;
      d = (d << 12 | d >>> 20) + a << 0;
      c += (b ^ (d & (a ^ b))) + blocks[2] + 606105819;
      c = (c << 17 | c >>> 15) + d << 0;
      b += (a ^ (c & (d ^ a))) + blocks[3] - 1044525330;
      b = (b << 22 | b >>> 10) + c << 0;
    }

    a += (d ^ (b & (c ^ d))) + blocks[4] - 176418897;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ (a & (b ^ c))) + blocks[5] + 1200080426;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ (d & (a ^ b))) + blocks[6] - 1473231341;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ (c & (d ^ a))) + blocks[7] - 45705983;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ (b & (c ^ d))) + blocks[8] + 1770035416;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ (a & (b ^ c))) + blocks[9] - 1958414417;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ (d & (a ^ b))) + blocks[10] - 42063;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ (c & (d ^ a))) + blocks[11] - 1990404162;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ (b & (c ^ d))) + blocks[12] + 1804603682;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ (a & (b ^ c))) + blocks[13] - 40341101;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ (d & (a ^ b))) + blocks[14] - 1502002290;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ (c & (d ^ a))) + blocks[15] + 1236535329;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[1] - 165796510;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[6] - 1069501632;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[11] + 643717713;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[0] - 373897302;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[5] - 701558691;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[10] + 38016083;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[15] - 660478335;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[4] - 405537848;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[9] + 568446438;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[14] - 1019803690;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[3] - 187363961;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[8] + 1163531501;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ (d & (b ^ c))) + blocks[13] - 1444681467;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ (c & (a ^ b))) + blocks[2] - 51403784;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ (b & (d ^ a))) + blocks[7] + 1735328473;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ (a & (c ^ d))) + blocks[12] - 1926607734;
    b = (b << 20 | b >>> 12) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[5] - 378558;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[8] - 2022574463;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[11] + 1839030562;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[14] - 35309556;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[1] - 1530992060;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[4] + 1272893353;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[7] - 155497632;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[10] - 1094730640;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[13] + 681279174;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[0] - 358537222;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[3] - 722521979;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[6] + 76029189;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[9] - 640364487;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[12] - 421815835;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[15] + 530742520;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[2] - 995338651;
    b = (b << 23 | b >>> 9) + c << 0;
    a += (c ^ (b | ~d)) + blocks[0] - 198630844;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[7] + 1126891415;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[14] - 1416354905;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[5] - 57434055;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[12] + 1700485571;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[3] - 1894986606;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[10] - 1051523;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[1] - 2054922799;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[8] + 1873313359;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[15] - 30611744;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[6] - 1560198380;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[13] + 1309151649;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[4] - 145523070;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[11] - 1120210379;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[2] + 718787259;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[9] - 343485551;
    b = (b << 21 | b >>> 11) + c << 0;

    if (this.first) {
      this.h0 = a + 1732584193 << 0;
      this.h1 = b - 271733879 << 0;
      this.h2 = c - 1732584194 << 0;
      this.h3 = d + 271733878 << 0;
      this.first = false;
    } else {
      this.h0 = this.h0 + a << 0;
      this.h1 = this.h1 + b << 0;
      this.h2 = this.h2 + c << 0;
      this.h3 = this.h3 + d << 0;
    }
  };

  /**
   * @method hex
   * @memberof Md5
   * @instance
   * @description Output hash as hex string
   * @returns {String} Hex string
   * @see {@link md5.hex}
   * @example
   * hash.hex();
   */
  Md5.prototype.hex = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;

    return HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
      HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
      HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
      HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
      HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
      HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
      HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
      HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
      HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
      HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
      HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
      HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
      HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
      HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
      HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
      HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F];
  };

  /**
   * @method toString
   * @memberof Md5
   * @instance
   * @description Output hash as hex string
   * @returns {String} Hex string
   * @see {@link md5.hex}
   * @example
   * hash.toString();
   */
  Md5.prototype.toString = Md5.prototype.hex;

  /**
   * @method digest
   * @memberof Md5
   * @instance
   * @description Output hash as bytes array
   * @returns {Array} Bytes array
   * @see {@link md5.digest}
   * @example
   * hash.digest();
   */
  Md5.prototype.digest = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3;
    return [
      h0 & 0xFF, (h0 >> 8) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 24) & 0xFF,
      h1 & 0xFF, (h1 >> 8) & 0xFF, (h1 >> 16) & 0xFF, (h1 >> 24) & 0xFF,
      h2 & 0xFF, (h2 >> 8) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 24) & 0xFF,
      h3 & 0xFF, (h3 >> 8) & 0xFF, (h3 >> 16) & 0xFF, (h3 >> 24) & 0xFF
    ];
  };

  /**
   * @method array
   * @memberof Md5
   * @instance
   * @description Output hash as bytes array
   * @returns {Array} Bytes array
   * @see {@link md5.array}
   * @example
   * hash.array();
   */
  Md5.prototype.array = Md5.prototype.digest;

  /**
   * @method arrayBuffer
   * @memberof Md5
   * @instance
   * @description Output hash as ArrayBuffer
   * @returns {ArrayBuffer} ArrayBuffer
   * @see {@link md5.arrayBuffer}
   * @example
   * hash.arrayBuffer();
   */
  Md5.prototype.arrayBuffer = function () {
    this.finalize();

    var buffer = new ArrayBuffer(16);
    var blocks = new Uint32Array(buffer);
    blocks[0] = this.h0;
    blocks[1] = this.h1;
    blocks[2] = this.h2;
    blocks[3] = this.h3;
    return buffer;
  };

  /**
   * @method buffer
   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
   * @memberof Md5
   * @instance
   * @description Output hash as ArrayBuffer
   * @returns {ArrayBuffer} ArrayBuffer
   * @see {@link md5.buffer}
   * @example
   * hash.buffer();
   */
  Md5.prototype.buffer = Md5.prototype.arrayBuffer;

  /**
   * @method base64
   * @memberof Md5
   * @instance
   * @description Output hash as base64 string
   * @returns {String} base64 string
   * @see {@link md5.base64}
   * @example
   * hash.base64();
   */
  Md5.prototype.base64 = function () {
    var v1, v2, v3, base64Str = '', bytes = this.array();
    for (var i = 0; i < 15;) {
      v1 = bytes[i++];
      v2 = bytes[i++];
      v3 = bytes[i++];
      base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
        BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] +
        BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] +
        BASE64_ENCODE_CHAR[v3 & 63];
    }
    v1 = bytes[i];
    base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
      BASE64_ENCODE_CHAR[(v1 << 4) & 63] +
      '==';
    return base64Str;
  };

  var exports = createMethod();

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    /**
     * @method md5
     * @description Md5 hash function, export to global in browsers.
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {String} md5 hashes
     * @example
     * md5(''); // d41d8cd98f00b204e9800998ecf8427e
     * md5('The quick brown fox jumps over the lazy dog'); // 9e107d9d372bb6826bd81d3542a419d6
     * md5('The quick brown fox jumps over the lazy dog.'); // e4d909c290d0fb1ca068ffaddf22cbd0
     *
     * // It also supports UTF-8 encoding
     * md5('中文'); // a7bac2239fcdcb3a067903d8077c4a07
     *
     * // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
     * md5([]); // d41d8cd98f00b204e9800998ecf8427e
     * md5(new Uint8Array([])); // d41d8cd98f00b204e9800998ecf8427e
     */
    root.md5 = exports;
    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return exports;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4), __webpack_require__(5)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {



/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/*jslint bitwise: true */
(function () {
    'use strict';
  
    var ERROR = 'input is invalid type';
    var WINDOW = typeof window === 'object';
    var root = WINDOW ? window : {};
    if (root.JS_SHA256_NO_WINDOW) {
      WINDOW = false;
    }
    var WEB_WORKER = !WINDOW && typeof self === 'object';
    var NODE_JS = !root.JS_SHA256_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
    if (NODE_JS) {
      root = global;
    } else if (WEB_WORKER) {
      root = self;
    }
    var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && typeof module === 'object' && module.exports;
    var AMD =  true && __webpack_require__(6);
    var ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
    var HEX_CHARS = '0123456789abcdef'.split('');
    var EXTRA = [-2147483648, 8388608, 32768, 128];
    var SHIFT = [24, 16, 8, 0];
    var K = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];
    var OUTPUT_TYPES = ['hex', 'array', 'digest', 'arrayBuffer'];
  
    var blocks = [];
  
    if (root.JS_SHA256_NO_NODE_JS || !Array.isArray) {
      Array.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
      };
    }
  
    if (ARRAY_BUFFER && (root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
      ArrayBuffer.isView = function (obj) {
        return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
      };
    }
  
    var createOutputMethod = function (outputType, is224) {
      return function (message) {
        return new Sha256(is224, true).update(message)[outputType]();
      };
    };
  
    var createMethod = function (is224) {
      var method = createOutputMethod('hex', is224);
      if (NODE_JS) {
        method = nodeWrap(method, is224);
      }
      method.create = function () {
        return new Sha256(is224);
      };
      method.update = function (message) {
        return method.create().update(message);
      };
      for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
        var type = OUTPUT_TYPES[i];
        method[type] = createOutputMethod(type, is224);
      }
      return method;
    };
  
    var nodeWrap = function (method, is224) {
      var crypto = eval("require('crypto')");
      var Buffer = eval("require('buffer').Buffer");
      var algorithm = is224 ? 'sha224' : 'sha256';
      var nodeMethod = function (message) {
        if (typeof message === 'string') {
          return crypto.createHash(algorithm).update(message, 'utf8').digest('hex');
        } else {
          if (message === null || message === undefined) {
            throw new Error(ERROR);
          } else if (message.constructor === ArrayBuffer) {
            message = new Uint8Array(message);
          }
        }
        if (Array.isArray(message) || ArrayBuffer.isView(message) ||
          message.constructor === Buffer) {
          return crypto.createHash(algorithm).update(new Buffer(message)).digest('hex');
        } else {
          return method(message);
        }
      };
      return nodeMethod;
    };
  
    var createHmacOutputMethod = function (outputType, is224) {
      return function (key, message) {
        return new HmacSha256(key, is224, true).update(message)[outputType]();
      };
    };
  
    var createHmacMethod = function (is224) {
      var method = createHmacOutputMethod('hex', is224);
      method.create = function (key) {
        return new HmacSha256(key, is224);
      };
      method.update = function (key, message) {
        return method.create(key).update(message);
      };
      for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
        var type = OUTPUT_TYPES[i];
        method[type] = createHmacOutputMethod(type, is224);
      }
      return method;
    };
  
    function Sha256(is224, sharedMemory) {
      if (sharedMemory) {
        blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
          blocks[4] = blocks[5] = blocks[6] = blocks[7] =
          blocks[8] = blocks[9] = blocks[10] = blocks[11] =
          blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
        this.blocks = blocks;
      } else {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
  
      if (is224) {
        this.h0 = 0xc1059ed8;
        this.h1 = 0x367cd507;
        this.h2 = 0x3070dd17;
        this.h3 = 0xf70e5939;
        this.h4 = 0xffc00b31;
        this.h5 = 0x68581511;
        this.h6 = 0x64f98fa7;
        this.h7 = 0xbefa4fa4;
      } else { // 256
        this.h0 = 0x6a09e667;
        this.h1 = 0xbb67ae85;
        this.h2 = 0x3c6ef372;
        this.h3 = 0xa54ff53a;
        this.h4 = 0x510e527f;
        this.h5 = 0x9b05688c;
        this.h6 = 0x1f83d9ab;
        this.h7 = 0x5be0cd19;
      }
  
      this.block = this.start = this.bytes = this.hBytes = 0;
      this.finalized = this.hashed = false;
      this.first = true;
      this.is224 = is224;
    }
  
    Sha256.prototype.update = function (message) {
      if (this.finalized) {
        return;
      }
      var notString, type = typeof message;
      if (type !== 'string') {
        if (type === 'object') {
          if (message === null) {
            throw new Error(ERROR);
          } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
            message = new Uint8Array(message);
          } else if (!Array.isArray(message)) {
            if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
              throw new Error(ERROR);
            }
          }
        } else {
          throw new Error(ERROR);
        }
        notString = true;
      }
      var code, index = 0, i, length = message.length, blocks = this.blocks;
  
      while (index < length) {
        if (this.hashed) {
          this.hashed = false;
          blocks[0] = this.block;
          blocks[16] = blocks[1] = blocks[2] = blocks[3] =
            blocks[4] = blocks[5] = blocks[6] = blocks[7] =
            blocks[8] = blocks[9] = blocks[10] = blocks[11] =
            blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
        }
  
        if (notString) {
          for (i = this.start; index < length && i < 64; ++index) {
            blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              blocks[i >> 2] |= code << SHIFT[i++ & 3];
            } else if (code < 0x800) {
              blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else if (code < 0xd800 || code >= 0xe000) {
              blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else {
              code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
              blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            }
          }
        }
  
        this.lastByteIndex = i;
        this.bytes += i - this.start;
        if (i >= 64) {
          this.block = blocks[16];
          this.start = i - 64;
          this.hash();
          this.hashed = true;
        } else {
          this.start = i;
        }
      }
      if (this.bytes > 4294967295) {
        this.hBytes += this.bytes / 4294967296 << 0;
        this.bytes = this.bytes % 4294967296;
      }
      return this;
    };
  
    Sha256.prototype.finalize = function () {
      if (this.finalized) {
        return;
      }
      this.finalized = true;
      var blocks = this.blocks, i = this.lastByteIndex;
      blocks[16] = this.block;
      blocks[i >> 2] |= EXTRA[i & 3];
      this.block = blocks[16];
      if (i >= 56) {
        if (!this.hashed) {
          this.hash();
        }
        blocks[0] = this.block;
        blocks[16] = blocks[1] = blocks[2] = blocks[3] =
          blocks[4] = blocks[5] = blocks[6] = blocks[7] =
          blocks[8] = blocks[9] = blocks[10] = blocks[11] =
          blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }
      blocks[14] = this.hBytes << 3 | this.bytes >>> 29;
      blocks[15] = this.bytes << 3;
      this.hash();
    };
  
    Sha256.prototype.hash = function () {
      var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4, f = this.h5, g = this.h6,
        h = this.h7, blocks = this.blocks, j, s0, s1, maj, t1, t2, ch, ab, da, cd, bc;
  
      for (j = 16; j < 64; ++j) {
        // rightrotate
        t1 = blocks[j - 15];
        s0 = ((t1 >>> 7) | (t1 << 25)) ^ ((t1 >>> 18) | (t1 << 14)) ^ (t1 >>> 3);
        t1 = blocks[j - 2];
        s1 = ((t1 >>> 17) | (t1 << 15)) ^ ((t1 >>> 19) | (t1 << 13)) ^ (t1 >>> 10);
        blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1 << 0;
      }
  
      bc = b & c;
      for (j = 0; j < 64; j += 4) {
        if (this.first) {
          if (this.is224) {
            ab = 300032;
            t1 = blocks[0] - 1413257819;
            h = t1 - 150054599 << 0;
            d = t1 + 24177077 << 0;
          } else {
            ab = 704751109;
            t1 = blocks[0] - 210244248;
            h = t1 - 1521486534 << 0;
            d = t1 + 143694565 << 0;
          }
          this.first = false;
        } else {
          s0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
          s1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
          ab = a & b;
          maj = ab ^ (a & c) ^ bc;
          ch = (e & f) ^ (~e & g);
          t1 = h + s1 + ch + K[j] + blocks[j];
          t2 = s0 + maj;
          h = d + t1 << 0;
          d = t1 + t2 << 0;
        }
        s0 = ((d >>> 2) | (d << 30)) ^ ((d >>> 13) | (d << 19)) ^ ((d >>> 22) | (d << 10));
        s1 = ((h >>> 6) | (h << 26)) ^ ((h >>> 11) | (h << 21)) ^ ((h >>> 25) | (h << 7));
        da = d & a;
        maj = da ^ (d & b) ^ ab;
        ch = (h & e) ^ (~h & f);
        t1 = g + s1 + ch + K[j + 1] + blocks[j + 1];
        t2 = s0 + maj;
        g = c + t1 << 0;
        c = t1 + t2 << 0;
        s0 = ((c >>> 2) | (c << 30)) ^ ((c >>> 13) | (c << 19)) ^ ((c >>> 22) | (c << 10));
        s1 = ((g >>> 6) | (g << 26)) ^ ((g >>> 11) | (g << 21)) ^ ((g >>> 25) | (g << 7));
        cd = c & d;
        maj = cd ^ (c & a) ^ da;
        ch = (g & h) ^ (~g & e);
        t1 = f + s1 + ch + K[j + 2] + blocks[j + 2];
        t2 = s0 + maj;
        f = b + t1 << 0;
        b = t1 + t2 << 0;
        s0 = ((b >>> 2) | (b << 30)) ^ ((b >>> 13) | (b << 19)) ^ ((b >>> 22) | (b << 10));
        s1 = ((f >>> 6) | (f << 26)) ^ ((f >>> 11) | (f << 21)) ^ ((f >>> 25) | (f << 7));
        bc = b & c;
        maj = bc ^ (b & d) ^ cd;
        ch = (f & g) ^ (~f & h);
        t1 = e + s1 + ch + K[j + 3] + blocks[j + 3];
        t2 = s0 + maj;
        e = a + t1 << 0;
        a = t1 + t2 << 0;
      }
  
      this.h0 = this.h0 + a << 0;
      this.h1 = this.h1 + b << 0;
      this.h2 = this.h2 + c << 0;
      this.h3 = this.h3 + d << 0;
      this.h4 = this.h4 + e << 0;
      this.h5 = this.h5 + f << 0;
      this.h6 = this.h6 + g << 0;
      this.h7 = this.h7 + h << 0;
    };
  
    Sha256.prototype.hex = function () {
      this.finalize();
  
      var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5,
        h6 = this.h6, h7 = this.h7;
  
      var hex = HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
        HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
        HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
        HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
        HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
        HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
        HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
        HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
        HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
        HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
        HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
        HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
        HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F] +
        HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
        HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
        HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
        HEX_CHARS[(h4 >> 28) & 0x0F] + HEX_CHARS[(h4 >> 24) & 0x0F] +
        HEX_CHARS[(h4 >> 20) & 0x0F] + HEX_CHARS[(h4 >> 16) & 0x0F] +
        HEX_CHARS[(h4 >> 12) & 0x0F] + HEX_CHARS[(h4 >> 8) & 0x0F] +
        HEX_CHARS[(h4 >> 4) & 0x0F] + HEX_CHARS[h4 & 0x0F] +
        HEX_CHARS[(h5 >> 28) & 0x0F] + HEX_CHARS[(h5 >> 24) & 0x0F] +
        HEX_CHARS[(h5 >> 20) & 0x0F] + HEX_CHARS[(h5 >> 16) & 0x0F] +
        HEX_CHARS[(h5 >> 12) & 0x0F] + HEX_CHARS[(h5 >> 8) & 0x0F] +
        HEX_CHARS[(h5 >> 4) & 0x0F] + HEX_CHARS[h5 & 0x0F] +
        HEX_CHARS[(h6 >> 28) & 0x0F] + HEX_CHARS[(h6 >> 24) & 0x0F] +
        HEX_CHARS[(h6 >> 20) & 0x0F] + HEX_CHARS[(h6 >> 16) & 0x0F] +
        HEX_CHARS[(h6 >> 12) & 0x0F] + HEX_CHARS[(h6 >> 8) & 0x0F] +
        HEX_CHARS[(h6 >> 4) & 0x0F] + HEX_CHARS[h6 & 0x0F];
      if (!this.is224) {
        hex += HEX_CHARS[(h7 >> 28) & 0x0F] + HEX_CHARS[(h7 >> 24) & 0x0F] +
          HEX_CHARS[(h7 >> 20) & 0x0F] + HEX_CHARS[(h7 >> 16) & 0x0F] +
          HEX_CHARS[(h7 >> 12) & 0x0F] + HEX_CHARS[(h7 >> 8) & 0x0F] +
          HEX_CHARS[(h7 >> 4) & 0x0F] + HEX_CHARS[h7 & 0x0F];
      }
      return hex;
    };
  
    Sha256.prototype.toString = Sha256.prototype.hex;
  
    Sha256.prototype.digest = function () {
      this.finalize();
  
      var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5,
        h6 = this.h6, h7 = this.h7;
  
      var arr = [
        (h0 >> 24) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 8) & 0xFF, h0 & 0xFF,
        (h1 >> 24) & 0xFF, (h1 >> 16) & 0xFF, (h1 >> 8) & 0xFF, h1 & 0xFF,
        (h2 >> 24) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 8) & 0xFF, h2 & 0xFF,
        (h3 >> 24) & 0xFF, (h3 >> 16) & 0xFF, (h3 >> 8) & 0xFF, h3 & 0xFF,
        (h4 >> 24) & 0xFF, (h4 >> 16) & 0xFF, (h4 >> 8) & 0xFF, h4 & 0xFF,
        (h5 >> 24) & 0xFF, (h5 >> 16) & 0xFF, (h5 >> 8) & 0xFF, h5 & 0xFF,
        (h6 >> 24) & 0xFF, (h6 >> 16) & 0xFF, (h6 >> 8) & 0xFF, h6 & 0xFF
      ];
      if (!this.is224) {
        arr.push((h7 >> 24) & 0xFF, (h7 >> 16) & 0xFF, (h7 >> 8) & 0xFF, h7 & 0xFF);
      }
      return arr;
    };
  
    Sha256.prototype.array = Sha256.prototype.digest;
  
    Sha256.prototype.arrayBuffer = function () {
      this.finalize();
  
      var buffer = new ArrayBuffer(this.is224 ? 28 : 32);
      var dataView = new DataView(buffer);
      dataView.setUint32(0, this.h0);
      dataView.setUint32(4, this.h1);
      dataView.setUint32(8, this.h2);
      dataView.setUint32(12, this.h3);
      dataView.setUint32(16, this.h4);
      dataView.setUint32(20, this.h5);
      dataView.setUint32(24, this.h6);
      if (!this.is224) {
        dataView.setUint32(28, this.h7);
      }
      return buffer;
    };
  
    function HmacSha256(key, is224, sharedMemory) {
      var i, type = typeof key;
      if (type === 'string') {
        var bytes = [], length = key.length, index = 0, code;
        for (i = 0; i < length; ++i) {
          code = key.charCodeAt(i);
          if (code < 0x80) {
            bytes[index++] = code;
          } else if (code < 0x800) {
            bytes[index++] = (0xc0 | (code >> 6));
            bytes[index++] = (0x80 | (code & 0x3f));
          } else if (code < 0xd800 || code >= 0xe000) {
            bytes[index++] = (0xe0 | (code >> 12));
            bytes[index++] = (0x80 | ((code >> 6) & 0x3f));
            bytes[index++] = (0x80 | (code & 0x3f));
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (key.charCodeAt(++i) & 0x3ff));
            bytes[index++] = (0xf0 | (code >> 18));
            bytes[index++] = (0x80 | ((code >> 12) & 0x3f));
            bytes[index++] = (0x80 | ((code >> 6) & 0x3f));
            bytes[index++] = (0x80 | (code & 0x3f));
          }
        }
        key = bytes;
      } else {
        if (type === 'object') {
          if (key === null) {
            throw new Error(ERROR);
          } else if (ARRAY_BUFFER && key.constructor === ArrayBuffer) {
            key = new Uint8Array(key);
          } else if (!Array.isArray(key)) {
            if (!ARRAY_BUFFER || !ArrayBuffer.isView(key)) {
              throw new Error(ERROR);
            }
          }
        } else {
          throw new Error(ERROR);
        }
      }
  
      if (key.length > 64) {
        key = (new Sha256(is224, true)).update(key).array();
      }
  
      var oKeyPad = [], iKeyPad = [];
      for (i = 0; i < 64; ++i) {
        var b = key[i] || 0;
        oKeyPad[i] = 0x5c ^ b;
        iKeyPad[i] = 0x36 ^ b;
      }
  
      Sha256.call(this, is224, sharedMemory);
  
      this.update(iKeyPad);
      this.oKeyPad = oKeyPad;
      this.inner = true;
      this.sharedMemory = sharedMemory;
    }
    HmacSha256.prototype = new Sha256();
  
    HmacSha256.prototype.finalize = function () {
      Sha256.prototype.finalize.call(this);
      if (this.inner) {
        this.inner = false;
        var innerHash = this.array();
        Sha256.call(this, this.is224, this.sharedMemory);
        this.update(this.oKeyPad);
        this.update(innerHash);
        Sha256.prototype.finalize.call(this);
      }
    };
  
    var exports = createMethod();
    exports.sha256 = exports;
    exports.sha224 = createMethod(true);
    exports.sha256.hmac = createHmacMethod();
    exports.sha224.hmac = createHmacMethod(true);
  
    if (COMMON_JS) {
      module.exports = exports;
    } else {
      root.sha256 = exports.sha256;
      root.sha224 = exports.sha224;
      if (AMD) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
          return exports;
        }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
      }
    }
  })();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(4), __webpack_require__(5)))

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ../src/js/utils/function-extend.js
var function_extend = __webpack_require__(7);

// EXTERNAL MODULE: ../src/js/utils/http.js
var http = __webpack_require__(0);
var http_default = /*#__PURE__*/__webpack_require__.n(http);

// EXTERNAL MODULE: /Users/yuanyuan/code/我的扩展程序/doc-assistant/node_modules/js-md5/src/md5.js
var md5 = __webpack_require__(8);
var md5_default = /*#__PURE__*/__webpack_require__.n(md5);

// CONCATENATED MODULE: ../src/js/open-api/baidu.js


//这接口极度不稳定 常常返回空字符
const api={
    appId:'20191228000370522',
    psd:'aAYWv9TR2rUL1VS67AZ9',
    url:'https://api.fanyi.baidu.com/api/trans/vip/translate'
};
function baidu(word,from='en',to='zh') {
    var appid = api.appId;
    var key = api.psd;
    var salt = (new Date).getTime();
    var query = word;
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var str1 = appid + query + salt + key;
    var sign = md5_default()(str1);
    var data = {
        q: encodeURI(query),
        appid: appid,
        salt: salt,
        from,
        to,
        sign: sign
    };
    let url=api.url;
   return http_default()(url, 'get', data);
}
/* harmony default export */ var open_api_baidu = (baidu);
// CONCATENATED MODULE: ../src/js/open-api/bing.js

//无法使用
const bing_api={
    url:'https://cn.bing.com/translate',
    url2:'https://cn.bing.com/translator'
}
function bing(word,from='en',to='zh-Hans'){
    let data={
        text:word,
        from,
        to
    };
    return http_default()(bing_api.url,'get',data);
}

/* harmony default export */ var open_api_bing = (bing);
// CONCATENATED MODULE: ../src/js/open-api/jinshan.js

//跨域
const jinshan_api={
   url:'http://fy.iciba.com/ajax.php'
}
function jinshan (w,f='en',t='zh'){
   let data={
       a:'fy',
       w,
       f,
       t
   };
   return http_default()(jinshan_api.url,'get',data);
}

/* harmony default export */ var open_api_jinshan = (jinshan);
// EXTERNAL MODULE: ../src/js/open-api/google.js
var google = __webpack_require__(9);
var google_default = /*#__PURE__*/__webpack_require__.n(google);

// CONCATENATED MODULE: ../src/js/open-api/tmxmall.js

//收费的  一千字=一块钱
//不支持https 
const tmxmall_api={
    set_provider:'http://api.tmxmall.com/v1/http/setmtprovider',
    translate:'http://api.tmxmall.com/v1/http/mttranslate',
    user_name:'1476369688@qq.com',
    client_id:'fc1a15e73fceade6e479d67e67ba2dc6',
    de:'app',
    mt_provider:'Google',
    mt_filed:'general',
};
function tmxmall_translate(word,from='en-GB',to='zh-CN') {
   let url=tmxmall_api.translate;
   let data={
    user_name:tmxmall_api.user_name,
    client_id:tmxmall_api.client_id,
    de:tmxmall_api.de,
    text:word,
    from,
    to
   };
   return http_default()(url, 'get', data);
}
/* harmony default export */ var tmxmall = (tmxmall_translate);
// EXTERNAL MODULE: ../src/js/utils/sha256.js
var sha256 = __webpack_require__(10);
var sha256_default = /*#__PURE__*/__webpack_require__.n(sha256);

// CONCATENATED MODULE: ../src/js/utils/jsonp.js
function jsonp(options){
    //无法直接在页面中注册回调函数  因为扩展程序和jsonp执行的上下文不同
    //解决方式: 在页面中使用script内联脚本注册回调函数  回调函数将json写入dom  扩展程序通过dom获取json;
    let {data,url,random}=options;
    data.callback='someRandomCallbackName'+random;
    let jsonContainerId='jsonContainer'+random;
    /**准备div */
    let jsonContainer=document.createElement('div');//div用来盛放jsonp返回结果
    jsonContainer.setAttribute('id',jsonContainerId);
    jsonContainer.style.display='none';//隐藏它
    document.body.appendChild(jsonContainer);

    /**注册回调 */
    let cb_ctx=document.createElement('script');//用于注册回调函数 
    cb_ctx.innerHTML=`${data.callback}=function (res){
        ${jsonContainerId}.innerHTML=JSON.stringify(res); //用data.callback命名回调函数 回调函数执行时 将res写入另一个div
    }`;
    document.documentElement.appendChild(cb_ctx);

    /**发送请求: */
    let query=queryFy(data);
    url+='?'+query;
    let req= document.createElement('script');
    req.setAttribute('src',url);
    req.setAttribute('id',options.reqName);
    document.documentElement.appendChild(req);

    
    //不知道怎么监听div的内容变化事件 先用定时器实现
    req.onload=function(){
        setTimeout(() => {
            /**操作dom获取json */
            let json=document.getElementById(jsonContainerId).innerHTML;
            options.success(JSON.parse(json));
            //请求结束,移除所有dom:
            req.remove();
            jsonContainer.remove();
            cb_ctx.remove();
        }, 50);
    };

    req.onerror=options.fail;
}

function queryFy (obj) {
    if(obj===null || obj===undefined) return '';
    let str='';
    for(let i in obj){
        str+=i+'='+obj[i]+'&'
    }
    str = str.slice(0,-1)    
    return str
  }

  /* harmony default export */ var utils_jsonp = (jsonp);
// CONCATENATED MODULE: ../src/js/open-api/youdao.js


// 暂时免费   仅支持jsonp
const youdao_api = {
    url: 'https://openapi.youdao.com/api',
    key: 'MYkBlBvl3BYgO14iPbq8WQl5prbfX3mB',
    id: '200695504e3c983b'
}
function youdao(word,from='en',to='zh-CHS') {
    let random=~~(Math.random()*1000);
    let reqName='someReqName'+random;
    return new Promise((resolve,reject)=>{
        var appKey = youdao_api.id;
        var key = youdao_api.key;//注意：暴露appSecret，有被盗用造成损失的风险
        var salt = (new Date).getTime();
        var curTime = Math.round(new Date().getTime() / 1000);
        var query = word;
        // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
        var str1 = appKey + truncate(query) + salt + curTime + key;
        var sign = sha256_default()(str1);
        return utils_jsonp({
            url: youdao_api.url,
            data: {
                q: query,
                appKey: appKey,
                salt: salt,
                from: from,
                to: to,
                sign: sign,
                signType: "v3",
                curtime: curTime,
            },
            reqName,
            random,
            success(res){
                document.getElementById(reqName).remove()
                resolve(res);
            },
            fail(err){
                document.getElementById(reqName).remove()
                reject(err);
            }
        });
    });
}
function truncate(q) {
    var len = q.length;
    if (len <= 20) return q;
    return q.substring(0, 10) + len + q.substring(len - 10, len);
}
/* harmony default export */ var open_api_youdao = (youdao);

// CONCATENATED MODULE: ../src/js/open-api/index.js
 //接口不稳定
 //无法使用
 //无法使用
 //无法使用
 //收费
 //暂时免费  仅支持jsonp 功能不错  比较稳定
/* harmony default export */ var open_api = ({
    baidu: open_api_baidu,
    bing: open_api_bing,
    google: google_default.a,
    jinshan: open_api_jinshan,
    tmxmall: tmxmall,
    youdao: open_api_youdao
});
// CONCATENATED MODULE: ../src/js/translateCallbak/youdao.js
const wikiUrl={
    baidu:'https://baike.baidu.com/item/',//百度百科 后面加关键词
    wiki:'https://zh-wiki.info/wiki/'//维基百科  后面加关键词
};

function youdao_youdao(obj) {
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

/* harmony default export */ var translateCallbak_youdao = (youdao_youdao);
// CONCATENATED MODULE: ../src/js/translateCallbak/index.js


/* harmony default export */ var translateCallbak = ({
    youdao: translateCallbak_youdao
});
// CONCATENATED MODULE: ./content_script/extension-action.js




/* harmony default export */ var extension_action = (initExtensionAction);

function initExtensionAction(appConfig, App_action, config) {
    let translateProvider = config.translateProvider;
    //选取事件的回调函数:
    const originHandler = function () {
        //先判断app是否已被用户通过dom按钮关闭:
        if (appConfig.app_state === 'closed') return shutDownApp();
        let current_word = config.current_word;
        var new_word = window.getSelection().toString();
        if (current_word === new_word || !/[A-z]+|\S/g.test(new_word) || new_word.length > appConfig.max_select_len) return; //过滤无效选取
        if (/[\u4E00-\u9FEF]/g.test(new_word)) return App_action.setWiki(new_word);//汉字不翻译 直接wiki
        config.current_word = new_word;//记录去重
        handleWord(new_word);
    }
    const selectionEventHandler = Object(function_extend["debounce"])(originHandler, 300, false);//防抖
    config.selectionEventHandler=selectionEventHandler;//存值,以便解除事件
    //准备app的dom模板:
    function prepareAppDom() { 
        var { container, style, app, options, msgContainer,script,settingStyle } = appConfig;
        const parsedOptions = `<a href="javascript:;" title='关闭' 
        style='background-image:url(${appConfig.icons.close})'
        id="doc_assistant_close" class="doc_assistant_option"></a>
        <a href="javascript:;" title='最小化' 
        style='background-image:url(${appConfig.icons.minify})'
        id="doc_assistant_minify" class="doc_assistant_option"></a>
        <a href="javascript:;" title='展开' 
        style='background-image:url(${appConfig.icons.maxfy})'
        id="doc_assistant_maxfy" class="doc_assistant_option"></a>`;

        app.setAttribute('id', appConfig.id);
        App_action.setState(appConfig.app_state);

        options.setAttribute('id', appConfig.optionsId);//按钮
        container.setAttribute('id', appConfig.containerId);//内容
        msgContainer.setAttribute('id', appConfig.msgContainerId);//消息
        script.setAttribute('id', appConfig.scriptId);//script
        settingStyle.setAttribute('id',appConfig.settingStyleId)

        app.setAttribute('draggable', 'true');
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

    //监听选取事件 
    function startWatch() {
        document.addEventListener('selectionchange', selectionEventHandler);//监听
    }
    //停止监听
    function stopWatch() {
        document.removeEventListener('selectionchange',config.selectionEventHandler);
        App_action.stopWatchOptionClick();
    }

    //翻译
    function translate(word) {
        App_action.loading()
        return open_api[translateProvider](word);
    }

    //展示翻译结果
    function appendResult(res) {
        App_action.setState('max')
        let parsedHTML = translateCallbak[translateProvider](res);//根据翻译源选择回调函数
        App_action.setContent(parsedHTML);
    }

    //处理单词：
    function handleWord(word) {
        translate(word).then(res => {
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
        App_action.setState('max');
        App_action.showToast('翻译已启用');
        startWatch();
        App_action.watchOptionClick();
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
// CONCATENATED MODULE: ./content_script/app-action.js
const app_action_wikiUrl = {
    baidu: 'https://baike.baidu.com/item/',//百度百科 后面加关键词
    wiki: 'https://zh-wiki.info/wiki/'//维基百科  后面加关键词
};
/* harmony default export */ var app_action = (initAppAction);

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
            <a href='${app_action_wikiUrl.wiki}${word}' target='__blank'  class="doc-assistant-wiki">维基百科 ${word}</a>
            <a href='${app_action_wikiUrl.baidu}${word}' target='__blank'  class="doc-assistant-wiki">百度百科 ${word}</a>`;
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

// EXTERNAL MODULE: ../src/js/runtime/storage.js
var runtime_storage = __webpack_require__(1);

// EXTERNAL MODULE: ../src/js/utils/createCssBySettings.js
var createCssBySettings = __webpack_require__(2);

// EXTERNAL MODULE: ../src/js/utils/init_settings.js
var init_settings = __webpack_require__(3);

// CONCATENATED MODULE: ./content_script/index.js





let context, runtime;

try {
    runtime = browser.runtime;
    context = browser;
} catch (err) {
    context = chrome;
    runtime = chrome.runtime;
};

/*初始化配置 */
const content_script_config = {
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
const content_script_appConfig = {
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
    scriptSrc: runtime.getURL(content_script_config.web_accessible_resources.script),
    cssSrc: runtime.getURL(content_script_config.web_accessible_resources.css),
    icons: {
        minify: runtime.getURL(content_script_config.web_accessible_resources.minify),
        maxfy: runtime.getURL(content_script_config.web_accessible_resources.maxfy),
        close: runtime.getURL(content_script_config.web_accessible_resources.close)
    },
    app_state: 'empty', //mini closed max empty
};
/**
 * -------禁止在appConfig以外使用createElement,以保证所有插入页面的元素都是可控的-------
 */

/*初始化配置 */

//初始化:
runtime_storage["a" /* default */].get('settings').then(res=>{
    // console.log('初始化',res)
    let setting_json;
    let settings=res.settings;
    if(settings){
        setting_json=JSON.parse(settings.newValue||settings.oldValue||settings);

    }else{
        setting_json=init_settings["a" /* default */];//使用默认配置
    }
    content_script_appConfig.settingCssText=Object(createCssBySettings["a" /* default */])(setting_json);
    getAndSetMaxLenBySettings(setting_json);
    init();
})

/*初始化 */
function init() {
    if (window.hasRun) return false;//防止重复实例
    /*防止重复实例化*/
    window.hasRun = true;
    /*防止重复实例化*/
    const App_action = app_action(content_script_appConfig);
    content_script_config.App_action=App_action;
    const Extension_action = extension_action(content_script_appConfig, App_action, content_script_config);
    content_script_config.Extension_action=Extension_action;

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
    content_script_appConfig.settingCssText=Object(createCssBySettings["a" /* default */])(settings);
    content_script_config.Extension_action.insertSettingStyle();
    getAndSetMaxLenBySettings(settings);
    content_script_config.App_action.showToast('设置已生效',3000);
  }
//设置更新:
context.storage.onChanged.addListener(handleStorageChange);

function getAndSetMaxLenBySettings(settings){
    if(typeof settings === 'object') {
        content_script_appConfig.max_select_len=settings.max_word_len-0;
    }else{
        /"max_word_len":"(\d+)"/.test(settings);
        content_script_appConfig.max_select_len=RegExp.$1-0;//从json中提取max_len
    }
}

/***/ })
/******/ ]);