let jogoAtivo = true

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