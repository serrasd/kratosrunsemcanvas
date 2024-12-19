const audio = new Audio('./assets/audio/gowaudio.mp3')
const morte = new Audio('./assets/audio/morte.mp3')
audio.volume = 0.3
morte.volume = 0.4


const kratos = document.getElementById('kratos')
const fundo = document.getElementById('fundo')
const pontuacaoElemento = document.querySelector('.valor-pontuacao')


const imagensAndando = []
const imagensPulo = []
const imagemFundo = new Image()
const imagemObstaculo = new Image()
imagemFundo.src = 'assets/imgs/background.png'
imagemObstaculo.src = 'assets/imgs/pedra.png'


for (let i = 1; i <= 8; i++) {
  const img = new Image()
  img.src = `assets/imgs/andar/kratos-andando-${i}.jpg`
  imagensAndando.push(img)
}

for (let i = 1; i <= 3; i++) {
  const img = new Image()
  img.src = `assets/imgs/pular/kratos-pulando-${i}.jpg`
  imagensPulo.push(img)
}


let xFundo = 0
let xKratos = 70
let yKratos = window.innerHeight * 0.07 
let velocidadeY = 0
let velocidadeFundo = 15

let pulando = false
let frameAtual = 0
let trocaFramePulo = 0
let ultimoFrame = 0
let delayTrocaImagemKratosAndando = 100
let contadorFramesPontuacao = 0
let intervaloPontuacao = 1

let pontuacao = 0
let xObstaculo = window.innerWidth
let jogoAtivo = true


const yObstaculo = window.innerHeight * 0.05
const frameInterval = 2000 / 90
const larguraObstaculo = 90
const alturaObstaculo = 90
const gravidade = 1.2
const alturaPulo = 18
const yChao = 53


function desenharFundo() {
  fundo.style.backgroundImage = `url(${imagemFundo.src})`
  fundo.style.backgroundPositionX = `${xFundo}px`
  fundo.style.backgroundSize = 'cover'
}

function desenharKratos(imagem) {
  kratos.style.backgroundImage = `url(${imagem.src})`
}

function animarCorrida() {
  frameAtual = (frameAtual + 1) % imagensAndando.length
  desenharKratos(imagensAndando[frameAtual])
}

function aplicarGravidade() {
  if (pulando) {
    velocidadeY -= gravidade
    yKratos += velocidadeY

    if (yKratos <= yChao) {
      yKratos = yChao
      pulando = false
      velocidadeY = 0
      trocaFramePulo = 0

      setTimeout(() => {
        yKratos = 53
      }, 100)
    }

    const imagemAtualPulo = imagensPulo[Math.floor(trocaFramePulo)]
    desenharKratos(imagemAtualPulo)

    if (yKratos > yChao) {
      trocaFramePulo += 0.1
      if (trocaFramePulo >= 3) trocaFramePulo = 2
    }
  }
}

function atualizarPontuacao() {
  contadorFramesPontuacao++
  if (contadorFramesPontuacao >= intervaloPontuacao) {
    pontuacao++
    pontuacaoElemento.textContent = pontuacao.toString().padStart(2, '0')
    contadorFramesPontuacao = 0

    if (pontuacao % 100 === 0) {
      velocidadeFundo += 1.5
    }
  }
}

function controlarAudio() {
  if (jogoAtivo) {
    audio.play()

  } else {
    audio.pause()
    morte.play()  
  }
}

function desenharObstaculo() {
  const obstaculo = document.getElementById('obstaculo')
  obstaculo.style.backgroundImage = `url(${imagemObstaculo.src})`
  obstaculo.style.width = `${larguraObstaculo}px`
  obstaculo.style.height = `${alturaObstaculo}px`
  obstaculo.style.position = 'absolute'
  obstaculo.style.bottom = `${yObstaculo}px`
  obstaculo.style.left = `${xObstaculo}px`
}

function verificarColisao() {
  const kratosDireita = xKratos + 40
  const kratosTopo = yKratos + 40

  const obstaculoEsquerda = xObstaculo
  const obstaculoDireita = xObstaculo + 70
  const obstaculoTopo = yObstaculo + 70

  if (
    kratosDireita > obstaculoEsquerda &&
    xKratos < obstaculoDireita &&
    kratosTopo > yObstaculo &&
    yKratos < obstaculoTopo
  ) {
    jogoAtivo = false
    controlarAudio()
    setTimeout(() => {
      alert('Game Over');
      location.reload();
    }, 10);
}
}

function atualizarAnimacao() {
  const agora = Date.now()

  if (agora - ultimoFrame >= delayTrocaImagemKratosAndando) {
    if (!pulando) {
      frameAtual = (frameAtual + 1) % imagensAndando.length
      desenharKratos(imagensAndando[frameAtual])
    } else {
      const imagemAtualPulo = imagensPulo[Math.floor(trocaFramePulo)]
      desenharKratos(imagemAtualPulo)
    }
    ultimoFrame = agora
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === ' ' && !pulando && jogoAtivo) {
    pulando = true
    velocidadeY = alturaPulo
    trocaFramePulo = 0
  }
})

setInterval(() => {
  if (!jogoAtivo) {
    if (morte.paused) {
      controlarAudio();
    }
    return;
  }

  controlarAudio()

  if (jogoAtivo) {
    audio.play()
  }

  if (pulando) {
    aplicarGravidade()
  }

  desenharFundo()
  kratos.style.bottom = `${yKratos}px`
  kratos.style.left = `${xKratos}px`

  xFundo -= velocidadeFundo
  xObstaculo -= velocidadeFundo
  if (xObstaculo <= -larguraObstaculo) {
    xObstaculo = window.innerWidth + Math.random() * 300
  }

  desenharObstaculo()
  verificarColisao()
  atualizarPontuacao()
}, frameInterval)

setInterval(atualizarAnimacao, 1)
setInterval(desenharFundo, 1)
