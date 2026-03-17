
let numMax = 10;
let listaNumSorteados = [];
let numeroSecreto = gerarNumAleatorio();
let tentativas =  1;
exibirMensagemInicial()

function exibirTextoTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoTela('h1','Jogo do número secreto');
    exibirTextoTela('p', 'Escolha um número de 1 a 10:');
}

function gerarNumAleatorio(){
   let numeroEscolhido = Math.floor(Math.random() * numMax + 1);
   let quantidadeDeItensLista = listaNumSorteados.length;

   if (quantidadeDeItensLista == numMax){
    listaNumSorteados = [];
   }

    if (listaNumSorteados.includes(numeroEscolhido)){
        return gerarNumAleatorio();
    } else{
       listaNumSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
    
}   

function verificarChute() {
    let chute = document.querySelector ('input').value;

    if (chute == numeroSecreto){
        exibirTextoTela('h1', 'Parabéns!Você conseguiu!');
         let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
         let mensagemTentativa = `Você acertou o número secreto (${numeroSecreto}) em ${tentativas} ${palavraTentativa}!`
        exibirTextoTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute ('disabled');
    } else if (chute > numeroSecreto){
        exibirTextoTela('p', `O número secreto é menor que ${chute}.`);
    } else {
        exibirTextoTela('p',`O número secreto é maior que ${chute}.`);
    }
    tentativas++;
    limparCampo();
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value ='';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumAleatorio();
    tentativas =  1;
    limparCampo();
    exibirMensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
