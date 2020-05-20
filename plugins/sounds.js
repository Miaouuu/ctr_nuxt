import Vue from 'vue'

let sfx_channels = []
let music_channel = new Audio()

let global_volume = 0.5

const sfx_format = "mp3"
const music_format = "mp3"

Vue.prototype.$playSFX = name => _playSFX(name)
Vue.prototype.$playMusic = name => _playMusic(name)
Vue.prototype.$updateVolume = volume => _updateVolume(volume)
Vue.prototype.$shutdownSoundSystem = () => _shutdownSoundSystem()

function _shutdownSoundSystem() {
  // Shutdown la musique
  music_channel.pause()
  music_channel.removeAttribute('src')
  music_channel.load()
  // Shutdown les sons en cours
  sfx_channels.forEach(sfx => {
    sfx.pause()
    sfx.removeAttribute('src')
    sfx.load()
  });
  sfx_channels.splice(0, sfx_channels.length)
}

function _playSFX(name) {
  let sfx = new Audio()
  sfx.src = require("@/assets/sounds/sfx/" + name + "." + sfx_format)
  sfx.volume = global_volume
  let index = sfx_channels.push(sfx) - 1
  sfx.addEventListener('ended', () => { sfx_channels.splice(index, 1) })
  sfx.play()
}

function _playMusic(name) {
  music_channel.src = require("@/assets/sounds/music/" + name + "." + music_format)
  music_channel.volume = global_volume
  music_channel.play()
}

function _updateVolume(volume) {
  volume = volume / 100
  global_volume = volume
  sfx_channels.forEach(sfx => {
    sfx.volume = global_volume
  });
  music_channel.volume = global_volume
}
