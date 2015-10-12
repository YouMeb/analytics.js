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

## 其他文件

* [正是環境](https://bitbucket.org/uradwebtracking/doc/src/86522cc12ebf)
* [使用方式](https://github.com/YouMeb/analytics.js/wiki/Quick-Start)
* [Plugins](https://github.com/YouMeb/analytics.js/wiki/Plugins)
* [使用者資料欄位](https://github.com/YouMeb/analytics.js/wiki/%E4%BD%BF%E7%94%A8%E8%80%85%E8%B3%87%E6%96%99%E6%AC%84%E4%BD%8D)
