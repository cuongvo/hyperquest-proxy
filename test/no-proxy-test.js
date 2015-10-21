var assert = require('assert')
var http = require('http')
var assertCalled = require('assert-called')
var HyperquestProxy = require('../')

var server = http.createServer(assertCalled(function (req, res) {
  res.writeHead(200)
  res.end()
  server.close()
})).listen(0, function () {
  var hyperquest = HyperquestProxy()
  hyperquest('http://127.0.0.1:' + server.address().port, assertCalled(function (err) {
    assert(!err)
  }))
})
