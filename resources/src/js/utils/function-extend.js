/**
 * 来自 @Polaris_tl [https://blog.csdn.net/Polaris_tl/article/details/99300458]
 * 防抖 函数会在延迟结束后再执行
 * 并且在延迟结束前的每次重复触发都会重置延迟时间,可以用于防止鼠标连击或屏幕滚动/resize等高频dom事件
 * @param {function} fn 不能是箭头函数
 * @param {number}  timeout 延迟时间 默认500ms
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
 * 节流：稀释函数的触发频率  强制让事件每隔500ms响应一次
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