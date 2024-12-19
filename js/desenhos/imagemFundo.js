const fundo = document.getElementById('fundo')
const imagemFundo = new Image()
imagemFundo.src = '../assets/imgs/background.png'

function desenharFundo() {
    fundo.style.backgroundImage = `url(${imagemFundo.src})`
    fundo.style.backgroundPositionX = `${xFundo}px`
    fundo.style.backgroundSize = 'cover'
}

desenharFundo()