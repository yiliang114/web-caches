# localstorage

对localstorage的封装，提供了更多、更简单实用的二次包装接口。

## 支持浏览器
```
IE10 / IE11 / FireFox / Chrome / Opera / Safri
```

## 使用方法

在head标签内引入storage.js即可。

```
<script src='storage.js'></script>
```

## 接口

```
isKey(key) // 判断是否含有某个属性
list() // 列出localstorage中所有的键值
setItemTime(key,value,seconds) // 设置localstorage的存储时间,可以设定每一个localstorage的储存时间 
setGlobalTime(seconds) // 设置整个localstorage的有效时间
isItemOverdue(key) // 判断该值是否过期
setObjToItem(obj) // 整个对象中的属性全都以键值对的形式储存进localstorage中
setObjItem(key, obj) // 将对象的值以字符串的形式存入localstorage中
getObjItem(key) // 获取存储的obj并转化为正常的object形式
setArrItem(key, arr) // 将一个数组中的值toString之后直接存入localstorage
getArrItem(key) // 从localstorage中获取之前存储的数组
```

