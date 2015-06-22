analytics.js
============

urAD 追蹤程式碼

* [快速上手](#快速上手)
* [API](#api)
* [開發](#開發)

## 快速上手

### 基本安裝

```javascript
var analytics = Analytics({ site: '網站ID，由 urAD 產生' });

analytics.init();

analytics.ready(function () {
  // ...
});
```

### 使用 Plugin

```javascript
var analytics = Analytics({ site: '...' })
  .use('google-analytics', { trackingID: 'UA-XXXXXXXX-X' })
  .init();

analytics.ready(function () {
  // ...  
});
```

### 送出追蹤資料

```javascript
analytics.track('事件名稱', '事件資料');
```

## API

### Analytics

#### .use(plugin)

```javascript
analytics.use({
  name: 'test',
  init: function (analytics, cb) {
    // ...
  }
});
```

#### .track(event, value, cb)

* event: `String`
* value: `String`/`Object`/`Array`
* cb: `Function`

#### .trackEvent(event, target, targetEvent, valueGatter, cb)

* event: `String`
* target: `Element`/`EventEmitter`
* valueGatter: `Function` 回傳真正要傳給 Server 的資料，這邊可以取得的參數跟 Event Handler 取得的資料完全相同。
* cb: `Function`

#### .trackLink(event, links)

* event: `String`
* links: `Element`/`[Element]`

#### .page(pageName, cb)

追蹤 page view

* pageName: `String`
* cb: `Function`

#### .ready(fn)

使用這個 method 確保所有初始化動作已完成。

## TrackingEvent

### .fulltype

完整 type 名稱

### .value

需要傳給 Server 的資料

### .getType()

取得 `.fulltype` 第一個 `:` 後的名稱。假設 `.fulltype` 是 `'ec:addProduct'`，那 `.getType()` 會傳`'addProduct'`

### .getCategory()

取得 `.fulltype` 第一個 `:` 前的名稱。假設 `.fulltype` 是 `'ec:addProduct'`，那 `.getCategory()` 會傳`'ec'`

## Plugins

* google-analytics: [YouMeb/analytics.js-google-analytics](https://github.com/YouMeb/analytics.js-google-analytics)

## 開發

```bash
$ git clone git@github.com:YouMeb/analytics.js.git
```

安裝開發中使用的工具

```bash
$ npm i
```

產生 standalone 檔案

```bash
$ make build
```
