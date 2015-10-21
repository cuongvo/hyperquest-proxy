var assert = require('assert')
var http = require('http')
var assertCalled = require('assert-called')
var HyperquestProxy = require('../')

var DEST_URL = 'http://127.0.0.1:4040/'

var proxyServer = http.createServer(assertCalled(function (req, res) {
  assert.equal(req.url, DEST_URL)
  process.exit()
})).listen(0, function () {
  var proxyPort = proxyServer.address().port

  var hyperquest = HyperquestProxy('http://127.0.0.1:' + proxyPort)
  hyperquest(DEST_URL, function () {
    // This should never execute as the proxy server never returns.
    assert(false)
  })
})
