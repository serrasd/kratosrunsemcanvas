let pulando = false
let velocidadeY = 0
let yKratos = window.innerHeight * 0.07 
let trocaFramePulo = 0

for (let i = 1; i <= 3; i++) {
  const img = new Image()
  img.src = `assets/imgs/pular/kratos-pulando-${i}.jpg`
  imagensPulo.push(img)
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