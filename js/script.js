const audio = new Audio('././assets/audio/gowaudio.mp3')

const kratos = document.getElementById('kratos')
const fundo = document.getElementById('fundo')
const pontuacaoElemento = document.querySelector('.valor-pontuacao')

const imagensAndando = []
for (let i = 1; i <= 8; i++) {
  const img = new Image()
  img.src = `assets/imgs/andar/kratos-andando-${i}.jpg`
  imagensAndando.push(img)
}

const imagensPulo = []
for (let i = 1; i <= 3; i++) {
  const img = new Image();
  img.src = `assets/imgs/pular/kratos-pulando-${i}.jpg`
  imagensPulo.push(img)
}

const imagemFundo = new Image()
imagemFundo.src = 'assets/imgs/background.png'

const imagemObstaculo = new Image()
imagemObstaculo.src = 'assets/imgs/pedra.png'

let xFundo = 0
let xKratos = 70
let yKratos = 53
let frameAtual = 0
let pulando = false
let velocidadeY = 0
const gravidade = 1.2
const alturaPulo = 18
const yChao = 53
let trocaFramePulo = 0

const frameInterval = 2000 / 90
let pontuacao = 0
let velocidadeFundo = 15

let xObstaculo = window.innerWidth
const yObstaculo = 37
const larguraObstaculo = 90
const alturaObstaculo = 90

let jogoAtivo = true

let ultimoFrame = 0
let delayTrocaImagem = 100

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
  audio.pause()
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
      trocaFramePulo += 0.2
      if (trocaFramePulo >= 3) trocaFramePulo = 2
    }
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === ' ' && !pulando && jogoAtivo) {
    pulando = true
    velocidadeY = alturaPulo
    trocaFramePulo = 0
  }
})

let contadorFramesPontuacao = 0;
const intervaloPontuacao = 5;

function atualizarPontuacao() {
  contadorFramesPontuacao++;
  if (contadorFramesPontuacao >= intervaloPontuacao) {
    pontuacao++;
    pontuacaoElemento.textContent = pontuacao.toString().padStart(2, '0');
    contadorFramesPontuacao = 0;

    if (pontuacao % 100 === 0) {
      velocidadeFundo += 0.1;
    }
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
    alert('Game Over')
    location.reload()
  }
}

function atualizarAnimacao() {
  const agora = Date.now()

  if (agora - ultimoFrame >= delayTrocaImagem) {
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

setInterval(() => {
  if (!jogoAtivo) return

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

setInterval(atualizarAnimacao, 50)
