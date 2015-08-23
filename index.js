'use strict'

var string = require('string')
var MultiStore = require('rdf-store-multi')

function ServerStore (options) {
  var self = this

  options = options || {}
  self.local = options.local
  self.remote = options.remote

  return function (host) {
    var router = function (method, args) {
      var iri = args[0]
      if (string(iri).beginsWith(host)) {
        return self.local
      } else {
        return self.remote
      }
    }
    return new MultiStore({router: router})
  }
}

module.exports = ServerStore
