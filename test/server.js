'use strict';

var url = require('url');
var http = require('http');

var server = http.creatServer(function (req, res) {
  var path = url.parse(req.path).pathname;

  beacon(path, req, res)
    || logging(path, req, res)
    || notfound(path, req, res);
});

server.listen(3001);

function beacon(path, req, res) {
  if (path === '/beacon') {
    var body = ''
      + '; typeof callback === \'function\' '
      + '&& urADAnalyticsAnonymousCallback({'
      + '"cid":"aa2929a6-d212-4aab-aea0-0801f849c647",'
      + '"tid":"fa5cb86d-8262-408f-9676-27b1e855e92c"})';
    res.statusCode = 200;
    res.setHeader('content-type', 'application/javascript');
    res.end(body);
    return true;
  }
}

function logging(path, req, res) {
  if (path === '/log') {
    res.statusCode = 200;
    res.end('success');
  }
}

function notfound(path, req, res) {
  res.statusCode = 404;
  res.end('page not found');
}
