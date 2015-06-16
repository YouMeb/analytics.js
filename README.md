analytics.js
============

urAD 追蹤程式碼

```javascript
var analytics = Analytics({
  site: 'example'
});

analytics.init();

analytics.ready(function () {
  analytics.track('test', 'abc');
});
```

## API

### .use(plugin)

```javascript
analytics.use({
  name: 'test',
  init: function (analytics, cb) {
    // ...
  }
});
```

### .track(event, value, cb)

* event: `String`
* value: `String`/`Object`/`Array`
* cb: `Function`

### .trackEvent(event, target, targetEvent, valueGatter, cb)

* event: `String`
* target: `Element`/`EventEmitter`
* valueGatter: `Function` 回傳真正要傳給 Server 的資料，這邊可以取得的參數跟 Event Handler 取得的資料完全相同。
* cb: `Function`

### .trackLink(event, links)

* event: `String`
* links: `Element`/`[Element]`

### .ready(fn)

使用這個 method 確保所有初始化動作已完成。

## 開發

```bash
$ git clone git@github.com:YouMeb/analytics.js.git
```

產生 standalone 檔案

```bash
$ make build
```
