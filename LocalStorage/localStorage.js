/**
 * 本地化存储(localStorage) 组件
 * 
 * 版权所有(C) 2017 zhijianzhang
 * 
 * [功能描述]
 * 
 * [可能存在的问题]
 * JSON.parse() 读取没有经过stringify()处理的localstorage值会报错
 * 
 * [更新日志]
 * 2017-08-22 zhijianzhang 创建
 */
(function(window){
    var localStorage = window.localStorage || {}
    /**
     * 判断是否含有某个属性
     * @param {*} key 
     */
    var isKey = function (key) {
        return localStorage.hasOwnProperty(key)
    }
    
    /**
     * 列出localstorage中所有的键值
     */
    var list = function () {
        for (var key in localStorage) {
            console.log('key:' + key + ' ' + 'value:' + localStorage[key])
        }
    }
    
    /**
     * 设置localstorage的存储时间,可以设定每一个localstorage的储存时间
     * @param {*} seconds 
     */
    var setItemTime = function (key, value, seconds) {
        var startTime = new Date().getTime()
        localStorage.setItem(key, JSON.stringify({ data: value, startTime: startTime, seconds: seconds }));
        setTimeout(function () {
            localStorage.removeItem(key)
        }, seconds)
    }
    
    /**
     * 设置整个localstorage的有效时间
     * @param {*} seconds 
     */
    var setGlobalTime = function (seconds) {
        // var nowTime = new Date().getTime()
        // localStorage.setItem('globalTime', seconds)
        setTimeout(function () {
            localStorage.clear()
        }, seconds)
    }
    
    /**
     * 判断该值是否过期
     * @param {*} key 
     */
    var isItemOverdue = function (key) {
    
        var data = localStorage.getItem(key)
    
        // todo 这个地方会报错，没有经过特殊处理的值不能这么读取
        try {
            var dataObj = JSON.parse(data)
            return
        } catch (e) {
            //如果报错，说明浏览器没有经过特殊处理的值不能这么读取
            console.log('e:' + e)
        }
    
        var now = new Date().getTime()
    
        if (now - dataObj.startTime > dataObj.seconds) {
            console.log(key + ' 该值已经过期')
            localStorage.removeItem(key)
            return true
        } else {
            console.log(key + ' 未过期')
            return false
        }
    }
    
    /**
     * 整个对象中的属性全都以键值对的形式储存进localstorage中
     * @param {*} obj 
     */
    var setObjToItem = function (obj) {
        if (obj instanceof Object) {
            for (var key in obj) {
                localStorage.setItem(key, obj[key])
            }
        }
    }
    
    /**
     * 将对象的值以字符串的形式存入localstorage中
     * @param {*} key 
     * @param {*} obj 
     */
    var setObjItem = function (key, obj) {
        if (obj instanceof Object) {
            localStorage.setItem(key, JSON.stringify(obj))
        }
    }
    
    /**
     * 获取存储的obj并转化为正常的object形式
     * @param {*} key 
     */
    var getObjItem = function (key) {
        var obj = localStorage.getItem(key)
        // todo 这里也不够严谨，有可能会报错
        try {
            var obj = JSON.parse(obj)
            return
        } catch (e) {
            //如果报错，说明浏览器没有经过特殊处理的值不能这么读取
            console.log('e:' + e)
        }
        return obj || {}
    }
    /**
     * 将一个数组中的值toString之后直接存入localstorage
     * @param {*} key 
     * @param {*} arr 
     */
    var setArrItem = function (key, arr) {
        if (arr instanceof Array) {
            localStorage.setItem(key, arr.toString())
        }
    }
    
    /**
     * 从localstorage中获取之前存储的数组
     * 这里解决了用户输入的key在localstorage中没有对应的值得情况下，split()函数报错的问题。
     * getArrItem()函数返回一个数组
     * @param {*} key 
     */
    var getArrItem = function (key) {
        var arr = localStorage.getItem(key)
        if (arr) {
            return arr.split(',')
        } else {
            return []
        }
    }
    
    window.LS = {
        isKey: isKey,
        list: list,
        setItemTime: setItemTime,
        setGlobalTime: setGlobalTime,
        isItemOverdue: isItemOverdue,
        setObjToItem: setObjToItem,
        setObjItem: setObjItem,
        getObjItem: getObjItem,
        setArrItem: setArrItem,
        getArrItem: getArrItem,
    }

    return LS
})(window)
