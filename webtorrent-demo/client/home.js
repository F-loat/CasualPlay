const moment = require('moment')
const P2PGraph = require('p2p-graph')
const prettierBytes = require('prettier-bytes')
const throttle = require('throttleit')
const WebTorrent = require('webtorrent')

module.exports = function () {
  let graph
  let torrent

  const $body = document.body
  const $progressBar = document.querySelector('#progressBar')
  const $numPeers = document.querySelector('#numPeers')
  const $downloaded = document.querySelector('#downloaded')
  const $total = document.querySelector('#total')
  const $remaining = document.querySelector('#remaining')

  function onWire (wire) {
    const id = wire.peerId.toString()
    graph.add({ id: id, name: wire.remoteAddress || 'Unknown' })
    graph.connect('You', id)
    wire.once('close', function () {
      graph.disconnect('You', id)
      graph.remove(id)
    })
  }

  function onProgress () {
    let percent = Math.round(torrent.progress * 100 * 100) / 100
    $progressBar.style.width = percent + '%'
    $numPeers.innerHTML = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers')
    $downloaded.innerHTML = prettierBytes(torrent.downloaded)
    $total.innerHTML = prettierBytes(torrent.length)

    let remaining
    if (torrent.done) {
      remaining = 'Done.'
    } else {
      remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
      remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
    }
    $remaining.innerHTML = remaining
  }

  function onDone () {
    $body.className += ' is-seed'
    onProgress()
  }

  function onTorrent () {
    const file = torrent.files.find(file => file.name.endsWith('.mp4'))

    file.renderTo('.dplayer-video', function (err, elem) {
      if (err) {
        console.error(err)
        return
      }
      elem.addEventListener('progress', onVideoProgress)
      function onVideoProgress () {
        elem.removeEventListener('progress', onVideoProgress)
        elem.parentElement.classList.add('playing')
      }
    })

    torrent.on('wire', onWire)
    torrent.on('done', onDone)
    torrent.on('download', throttle(onProgress, 250))
    torrent.on('upload', throttle(onProgress, 250))
    setInterval(onProgress, 5000)
    onProgress()
  }

  function createClient () {
    const client = window.client = new WebTorrent()
    torrent = client.add(`${window.location.origin}/test.torrent`, onTorrent)
    graph.add({ id: 'You', name: 'You', me: true })
  }

  function init () {
    document.querySelector('#hero').className = 'loading'
    graph = window.graph = new P2PGraph('.torrent-graph')
    createClient()
  }
  init()
}
