'use strict'

var string = require('string')
var MultiStore = require('rdf-store-multi')
var inherits = require('util').inherits

function ServerStore (options) {
  options = options || {}

  var self = this
  self.local = options.local
  self.remote = options.remote
  self.host = options.host

  var router = function (method, args) {
    var iri = args[0]
    var options = args[args.length - 1] || {}
    var host = options.host || self.host || 'http://localhost'
    if (string(iri).startsWith(host)) {
      return self.local
    } else {
      return self.remote
    }
  }

  options.router = router
  MultiStore.call(this, options)
}
inherits(ServerStore, MultiStore)

module.exports = ServerStore
