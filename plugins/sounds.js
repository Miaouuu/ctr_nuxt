import Vue from 'vue'

let sfx_channel = new Audio()
let music_channel = new Audio()

const sfx_format = "mp3"
const music_format = "mp3"

Vue.prototype.$playSFX = name => _playSFX(name)
Vue.prototype.$playMusic = name => _playMusic(name)
Vue.prototype.$updateVolume = volume => _updateVolume(volume)

function _playSFX(name) {
  sfx_channel.src = require("@/assets/sounds/sfx/" + name + "." + sfx_format)
  sfx_channel.play()
}

function _playMusic(name) {
  music_channel.src = require("@/assets/sounds/music/" + name + "." + music_format)
  music_channel.play()
}

function _updateVolume(volume) {
  sfx_channel.volume = volume
  music_channel.volume = volume
}
