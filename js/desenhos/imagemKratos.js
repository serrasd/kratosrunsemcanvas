const kratos = document.getElementById('kratos')
const imagensAndando = []

for (let i = 1; i <= 8; i++) {
  const img = new Image()
  img.src = `../assets/imgs/andar/kratos-andando-${i}.jpg`
  imagensAndando.push(img)
}

function desenharKratos(imagem) {
  kratos.style.backgroundImage = `url(${imagem.src})`
}

desenharKratos()