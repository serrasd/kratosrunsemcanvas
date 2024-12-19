import { estadoFrame } from "./andarOuPular"

function animarCorrida() {
    estadoFrame.frameAtual = (frameAtual + 1) % imagensAndando.length
    desenharKratos(imagensAndando[frameAtual])
  }