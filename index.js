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

  self.router = function (method, args) {
    var iri = args[0]
    var options = args[args.length - 1] || {}
    var host = options.host || self.host || 'http://localhost'
    if (string(iri).beginsWith(host)) {
      return self.local
    } else {
      return self.remote
    }
  }
}
inherits(ServerStore, MultiStore)

module.exports = ServerStore
