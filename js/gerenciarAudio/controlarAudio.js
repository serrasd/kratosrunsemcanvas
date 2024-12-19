const audio = new Audio('./assets/audio/gowaudio.mp3')
const morte = new Audio('./assets/audio/morte.mp3')
audio.volume = 0.3
morte.volume = 0.4

function controlarAudio() {
    if (jogoAtivo) {
      audio.play()
  
    } else {
      audio.pause()
      morte.play()  
    }
  }