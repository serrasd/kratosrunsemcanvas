const audio = new Audio('././assets/audio/gowaudio.mp3');

const kratos = document.getElementById('kratos');
const fundo = document.getElementById('fundo');
const pontuacaoElemento = document.querySelector('.valor-pontuacao');

const imagensAndando = [];
for (let i = 1; i <= 8; i++) {
  const img = new Image();
  img.src = `assets/imgs/andar/kratos-andando-${i}.jpg`;
  imagensAndando.push(img);
}

const imagensPulo = [];
for (let i = 1; i <= 3; i++) {
  const img = new Image();
  img.src = `assets/imgs/pular/kratos-pulando-${i}.jpg`;
  imagensPulo.push(img);
}

const imagemFundo = new Image();
imagemFundo.src = 'assets/imgs/background.png';

const imagemObstaculo = new Image();
imagemObstaculo.src = 'assets/imgs/pedra.png';

let xFundo = 0;
let xKratos = 70;
let yKratos = 53;
let frameAtual = 0;
let pulando = false;
let velocidadeY = 0;
const gravidade = 1.2;
const alturaPulo = 14;
const yChao = 53;
let trocaFramePulo = 0;

const frameInterval = 1000 / 12;
let pontuacao = 0;
let velocidadeFundo = 15;

let xObstaculo = window.innerWidth;
const yObstaculo = 48;
const larguraObstaculo = 50;
const alturaObstaculo = 50;

let jogoAtivo = true;

function desenharFundo() {
  fundo.style.backgroundImage = `url(${imagemFundo.src})`;
  fundo.style.backgroundPositionX = `${xFundo}px`;
  fundo.style.backgroundSize = 'cover';
  fundo.style.height = '100vh';
}

function desenharKratos(imagem) {
  kratos.style.backgroundImage = `url(${imagem.src})`;
}

function animarCorrida() {
  frameAtual = (frameAtual + 1) % imagensAndando.length;
  desenharKratos(imagensAndando[frameAtual]);
  audio.pause();
}

function aplicarGravidade() {
  if (pulando) {
    velocidadeY -= gravidade;
    yKratos += velocidadeY;

    if (yKratos <= yChao) {
      yKratos = yChao;
      pulando = false;
      velocidadeY = 0;
      trocaFramePulo = 0;

      setTimeout(() => {
        yKratos = 53;
      }, 100);
    }

    const imagemAtualPulo = imagensPulo[Math.floor(trocaFramePulo)];
    desenharKratos(imagemAtualPulo);

    if (yKratos > yChao) {
      trocaFramePulo += 0.2;
      if (trocaFramePulo >= 3) trocaFramePulo = 2;
    }
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === ' ' && !pulando && jogoAtivo) {
    pulando = true;
    velocidadeY = alturaPulo;
    trocaFramePulo = 0;
  }
});

function atualizarPontuacao() {
  pontuacao++;
  pontuacaoElemento.textContent = pontuacao.toString().padStart(2, '0');

  if (pontuacao % 100 === 0) {
    velocidadeFundo += 2;
  }
}

function desenharObstaculo() {
  const obstaculo = document.getElementById('obstaculo');
  obstaculo.style.backgroundImage = `url(${imagemObstaculo.src})`;
  obstaculo.style.width = `${larguraObstaculo}px`;
  obstaculo.style.height = `${alturaObstaculo}px`;
  obstaculo.style.position = 'absolute';
  obstaculo.style.bottom = `${yObstaculo}px`;
  obstaculo.style.left = `${xObstaculo}px`;
}

function verificarColisao() {
  const kratosDireita = xKratos + 60;
  const kratosTopo = yKratos + 60;

  const obstaculoEsquerda = xObstaculo;
  const obstaculoDireita = xObstaculo + larguraObstaculo;
  const obstaculoTopo = yObstaculo + alturaObstaculo;

  if (
    kratosDireita > obstaculoEsquerda &&
    xKratos < obstaculoDireita &&
    kratosTopo > yObstaculo &&
    yKratos < obstaculoTopo
  ) {
    jogoAtivo = false;
    alert('Game Over');
    location.reload();
  }
}

setInterval(() => {
  if (!jogoAtivo) return;

  if (pulando) {
    aplicarGravidade();
  } else {
    animarCorrida();
  }

  desenharFundo();
  kratos.style.bottom = `${yKratos}px`
  kratos.style.left = `${xKratos}px`

  xFundo -= velocidadeFundo
  if (xFundo <= -window.innerWidth) {
    xFundo = 0
  }

  xObstaculo -= velocidadeFundo
  if (xObstaculo <= -larguraObstaculo) {
    xObstaculo = window.innerWidth + Math.random() * 300
  }

  desenharObstaculo()
  verificarColisao()
  atualizarPontuacao()
}, frameInterval)