analytics.js [![build](https://img.shields.io/travis/YouMeb/analytics.js.svg)](https://travis-ci.org/YouMeb/analytics.js)
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

## API

可直接到程式檔案內看說明，或 `clone` 專案後下 `make docs` 指令產生 markdown 文件。

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
