const tracker = require('bittorrent-tracker')

const server = new tracker.Server({
  ws: true
})

server.on('error', (err) => {
  console.log(err.message)
})

server.on('warning', (err) => {
  console.log(err.message)
})

server.on('listening', () => {
  console.log('listening on ws port:' + server.ws.address().port)
})

server.on('start', (addr) => {
  console.log('got start message from ' + addr)
})

module.exports = server
