var clone = require('clone')
var hyperquest = require('hyperquest')
var HTTPSProxyAgent = require('https-proxy-agent')

module.exports = function (proxyOptions, hyperquest_) {
  var h = hyperquest_ || hyperquest
  var agent

  if (proxyOptions) agent = new HTTPSProxyAgent(proxyOptions);

  return function(uri, opts, cb) {
    if (typeof uri === 'object') {
      cb = opts
      opts = uri
    }

    if (typeof opts === 'function') {
      cb = opts
      opts = undefined
    }

    if (!opts) opts = {}

    if (agent) {
      opts = clone(opts);
      opts.agent = agent
    }

    return h(uri, opts, cb)
  }
}
