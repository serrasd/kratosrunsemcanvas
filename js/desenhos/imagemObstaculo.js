const imagemObstaculo = new Image()
imagemObstaculo.src = 'assets/imgs/pedra.png'

const yObstaculo = window.innerHeight * 0.05
const larguraObstaculo = 90
const alturaObstaculo = 90


function desenharObstaculo() {
  const obstaculo = document.getElementById('obstaculo')
  obstaculo.style.backgroundImage = `url(${imagemObstaculo.src})`
  obstaculo.style.width = `${larguraObstaculo}px`
  obstaculo.style.height = `${alturaObstaculo}px`
  obstaculo.style.position = 'absolute'
  obstaculo.style.bottom = `${yObstaculo}px`
  obstaculo.style.left = `${xObstaculo}px`
}