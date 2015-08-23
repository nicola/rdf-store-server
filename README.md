# rdf-store-server

RDF Store that uses a local store or a remote store depending on the IRI.
It follows the [RDF-ext Interface](http://bergos.github.io/rdf-ext-spec/) specification.


## Install

```
npm install --save rdf-store-server
```

## Usage

You will have to specify a `local` and a `remote` store in the `options`.
If the `host` (see the example) matches the `IRI` of the request,
it means that the file can be accessed by the `local` store, the `remote` will be used otherwise

```javascript
var rdf = require('rdf-ext')
var LdpStore = require('rdf-store-ldp')
var FileStore = require('rdf-store-fs')
var ServerStore = require('rdf-store-server')
var http = require('express')

var store = ServerStore({
  local: new LdpStore(rdf),
  remote: new FileStore(rdf)
})

var app = express()
app.get('/*', function(req, res) {
  var host = req.protocol + '://' + req.host

  store(host).graph(host + req.originalUrl, function (graph, err) {
    // This will run on the local store (FileStore)
  })

  store(host).graph('http://other.tld/resource.tld', function (graph, err) {
    // This will run on the remote store (LdpStore)
  })
})

```


## History

Originally made by [Nicola Greco](https://github.com/nicola)

## Licence

MIT