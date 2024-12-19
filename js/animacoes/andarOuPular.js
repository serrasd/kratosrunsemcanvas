export const  estadoFrame = {
  frameAtual: 0
}
let ultimoFrame = 0
let delayTrocaImagemKratosAndando = 100
let trocaFramePulo = 0

function atualizarAnimacao() {
  const agora = Date.now()
  

  if (agora - ultimoFrame >= delayTrocaImagemKratosAndando) {
    if (!pulando) {
      estadoFrame.frameAtual = (frameAtual + 1) % imagensAndando.length
      desenharKratos(imagensAndando[frameAtual])
    } else {
      const imagemAtualPulo = imagensPulo[Math.floor(trocaFramePulo)]
      desenharKratos(imagemAtualPulo)
    }
    ultimoFrame = agora
  }
}