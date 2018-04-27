const fs = require('fs')
const createTorrent = require('create-torrent')
const parseTorrent = require('parse-torrent')
const config = require('../config')

createTorrent(`${config.root}/static/video/mv.mp4`, {
  announceList: [['ws://127.0.0.1:6969']],
  urlList: ['http://127.0.0.1:8080/video/mv.mp4']
}, function (err, torrent) {
  if (err) {
    console.log(err)
    return
  }
  fs.writeFileSync(`${config.root}/static/test.torrent`, torrent)

  const info = parseTorrent(fs.readFileSync(`${config.root}/static/test.torrent`))
  console.log(info)
})
