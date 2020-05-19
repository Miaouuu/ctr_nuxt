import Vue from 'vue'

let sfx_channels = []
let music_channel = new Audio()

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
  let index = sfx_channels.push(sfx) - 1
  sfx.addEventListener('ended', () => { console.log('Suppression du son : ' + sfx_channels[index].src); sfx_channels.splice(index, 1); console.log(sfx_channels) })
  sfx.play()
}

function _playMusic(name) {
  music_channel.src = require("@/assets/sounds/music/" + name + "." + music_format)
  music_channel.play()
}

function _updateVolume(volume) {
  sfx_channels.forEach(sfx => {
    sfx.volume = volume
  });
  music_channel.volume = volume
}
