const compress = require('compression')
const cors = require('cors')
const downgrade = require('downgrade')
const express = require('express')
const http = require('http')
const path = require('path')
const trackerServer = require('./tracker')

const app = express()
const server = http.createServer(app)

// Use GZIP
app.use(compress())

app.options('/torrents/*', cors({ maxAge: 60 * 60 }))

app.get('/torrents/*', cors(), express.static(path.join(__dirname, '../static')))

// Serve static resources
app.use(express.static(path.join(__dirname, '../static')))

server.listen(8080, function () {
  console.log('Listening on port 8080')
  downgrade()
})

trackerServer.listen(6969)
