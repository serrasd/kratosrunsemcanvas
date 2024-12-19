let pontuacao = 0
let contadorFramesPontuacao = 0
let intervaloPontuacao = 1
let velocidadeFundo = 15

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