const kratos = document.getElementById('kratos');
const fundo = document.getElementById('fundo');

const imagensAndando = []
for (let i = 1; i <= 8; i++) {
  const img = new Image();
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

let xFundo = 0
let xKratos = 70
let yKratos = 53
let frameAtual = 0
let pulando = false
let velocidadeY = 0
const gravidade = 1.2
const alturaPulo = 14
const yChao = 53
let trocaFramePulo = 0

const frameInterval = 1000 / 12

function desenharFundo() {
  fundo.style.backgroundImage = `url(${imagemFundo.src})`
  fundo.style.backgroundPositionX = `${xFundo}px`
  fundo.style.backgroundSize = 'cover'
  fundo.style.height = '100vh'
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
      trocaFramePulo += 0.2
      if (trocaFramePulo >= 3) trocaFramePulo = 2
    }
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === ' ' && !pulando) {
    pulando = true
    velocidadeY = alturaPulo
    trocaFramePulo = 0
  }
})

setInterval(() => {
  if (pulando) {
    aplicarGravidade()
  } else {
    animarCorrida()
  }

  desenharFundo()
  kratos.style.bottom = `${yKratos}px`
  kratos.style.left = `${xKratos}px`
  xFundo -= 15
  
}, frameInterval)