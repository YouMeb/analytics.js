analytics.js
============

<a href="https://travis-ci.org/YouMeb/analytics.js"><img style="vertical-align: middle" src="https://img.shields.io/travis/YouMeb/analytics.js/master.svg" /></a> `master` <a href="https://travis-ci.org/YouMeb/analytics.js"><img style="vertical-align: middle" src="https://img.shields.io/travis/YouMeb/analytics.js/development.svg" /></a> `development`

urAD 追蹤程式碼

[後端專案](https://bitbucket.org/uradwebtracking/)

## API

可直接到程式檔案內看說明，或 `clone` 專案後下 `make docs` 指令產生 markdown 文件。

## 開發

### 環境

* iojs v1 v2
* git
* aws command line tool

### 取得原始碼

```bash
$ git clone git@github.com:YouMeb/analytics.js.git
```

### 安裝專案必要 Node.js 工具

```bash
$ npm i
```

### 建立 standalone 檔案

```bash
$ make
```

### 發布新版本

```bash
# 這個指令會 build 新的 JavaScript 檔案並上傳到 s3
#
# aws account: urad-old
# aws region: ap-southeast-1
# aws s3 bucket: urad-tracking
#
# 網址 https://s3-ap-southeast-1.amazonaws.com/urad-tracking/release-<version_number>.js
$ make release
```

## 快速安裝

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

## 主要運作機制

analytics.js 主要分成幾個部分：

* user 身份辨認
* 資料傳遞
* plugin（為了方便針對不同網站做客製）
* Event
* 基本頁面資料抓取方法

### User 身份辨認

使用者一進入網頁我們會產生一個 fingerprint，fingerprint 是依據使用者作業系統、瀏覽器版本、瀏覽器廠商、瀏覽器設定、安裝字體等資訊產生，用來輔助使用者身份辨認，主要辨認方式是使用 cookie + etag + localStorage，我們會產生一個 uuid 給第一次瀏覽有安裝我們 tracking code 的網頁的使用者，因為 cookie 資料會同步到 etag、localStorage 的關係，所以只要使用者沒有同時清 cache、cookie、localStorage 他就會一直對應到同一個 uuid。

localStorage 同步：[`lib/cookie`](https://github.com/YouMeb/analytics.js/tree/master/lib/cookie)

### 資料傳遞

資料蒐集目前規劃兩類：

1. __使用者資料__：像是 email、姓名，這部分傳遞前可能需要加密，目前還沒做
2. __log 資料__：像是使用者瀏覽了網頁 A、B、C，在 A 頁點了哪一個按鈕（[`lib/beacon`](https://github.com/YouMeb/analytics.js/tree/master/lib/beacon)）

### Plugin

在 `analytics.init()` 之前使用 `.use` 使用 plugin，所有 plugin 必須有一個 `.init` 的 method（可參考現有的幾個 plugin），`analytics.init()` 的時候會初始化 `analytics` 本身，還所有的 plugin。

#### 什麼情況可以寫 plugin

1. 有多個類似結構的網頁
2. 很常見，但非必要的功能，像是 [GA](https://github.com/YouMeb/analytics.js-google-analytics)

### Event

`analytics` 是一個 `EventEmitter`，他有 `emit`、`on` 這些 method，plugin 主要就是透過 event 來決定什麼時候要做什麼事，plugin 當然也可以自訂 event。

### 基本頁面資料抓取方法

在 [`lib/analytics.js`](https://github.com/YouMeb/analytics.js/blob/master/lib/analytics.js) 提供一些常見的 method 來記錄使用者操作行為，詳細用法可以直接看程式碼，裡面有註解。

## 其他文件

* [正式環境](https://bitbucket.org/uradwebtracking/doc/src/86522cc12ebf)
* [Plugins](https://github.com/YouMeb/analytics.js/wiki/Plugins)
* [使用者資料欄位](https://github.com/YouMeb/analytics.js/wiki/%E4%BD%BF%E7%94%A8%E8%80%85%E8%B3%87%E6%96%99%E6%AC%84%E4%BD%8D)
