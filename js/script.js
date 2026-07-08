// ==========================================
// SAUDAÇÃO PERSONALIZADA
// Guarda o nome digitado em uma variável e
// exibe uma mensagem de boas-vindas na tela.
// ==========================================
const formSaudacao = document.getElementById("formSaudacao");
const mensagemSaudacao = document.getElementById("mensagemSaudacao");

formSaudacao.addEventListener("submit", function (evento) {
  evento.preventDefault(); // Evita que a página recarregue ao enviar o formulário

  // Guarda o valor digitado em uma variável
  const nome = document.getElementById("nomeUsuario").value;

  // Atualiza o texto do elemento na tela usando a variável
  mensagemSaudacao.textContent = "Olá, " + nome + "! Vamos cuidar juntos do planeta. 🌍";

  formSaudacao.reset(); // Limpa o campo depois de enviar
});


// ==========================================
// MODO ESCURO
// Alterna a classe "modo-escuro" no <body>
// e troca o texto do botão.
// ==========================================
const btnModoEscuro = document.getElementById("btnModoEscuro");

btnModoEscuro.addEventListener("click", function () {
  document.body.classList.toggle("modo-escuro");

  // Verifica se o modo escuro está ativo para trocar o ícone do botão
  const ativo = document.body.classList.contains("modo-escuro");
  btnModoEscuro.textContent = ativo ? "☀️" : "🌙";
});


// ==========================================
// AUMENTAR / DIMINUIR FONTE
// Controla o tamanho da fonte usando uma
// variável que guarda o valor atual em porcentagem.
// ==========================================
let tamanhoFonte = 100; // Valor inicial em porcentagem

const btnAumentarFonte = document.getElementById("btnAumentarFonte");
const btnDiminuirFonte = document.getElementById("btnDiminuirFonte");

btnAumentarFonte.addEventListener("click", function () {
  if (tamanhoFonte < 130) {
    tamanhoFonte += 10;
    document.body.style.fontSize = tamanhoFonte + "%";
  }
});

btnDiminuirFonte.addEventListener("click", function () {
  if (tamanhoFonte > 80) {
    tamanhoFonte -= 10;
    document.body.style.fontSize = tamanhoFonte + "%";
  }
});


// ==========================================
// CALCULADORA DE PEGADA DE CARBONO
// Processa o número digitado antes de exibir
// o resultado na tela (armazenamento em variáveis).
// ==========================================
const btnCalcular = document.getElementById("btnCalcular");
const resultadoCalculo = document.getElementById("resultadoCalculo");

// Estimativa simplificada: cada km rodado de carro emite, em média, 0,12 kg de CO2
const CO2_POR_KM = 0.12;

btnCalcular.addEventListener("click", function () {
  // Guarda o valor digitado em uma variável e converte para número
  const kmPorSemana = Number(document.getElementById("kmSemana").value);

  if (kmPorSemana <= 0 || isNaN(kmPorSemana)) {
    resultadoCalculo.textContent = "Digite um número válido de quilômetros.";
    return;
  }

  // Processa a informação antes de exibir (semana x 4 = estimativa mensal)
  const co2Semanal = kmPorSemana * CO2_POR_KM;
  const co2Mensal = co2Semanal * 4;

  resultadoCalculo.textContent =
    "Você emite cerca de " + co2Semanal.toFixed(1) + " kg de CO₂ por semana (" +
    co2Mensal.toFixed(1) + " kg por mês) só com deslocamentos de carro.";
});


// ==========================================
// JOGO DE SEPARAÇÃO DE LIXO
// Usa um array de objetos para guardar os itens
// e uma variável de pontuação atualizada a cada acerto.
// ==========================================

// Lista de itens do jogo, cada um com o tipo correto de lixeira
const itensJogo = [
  { nome: "Garrafa PET", tipo: "plastico" },
  { nome: "Jornal Velho", tipo: "papel" },
  { nome: "Pote de Vidro", tipo: "vidro" },
  { nome: "Lata de Alumínio", tipo: "metal" },
  { nome: "Caixa de Papelão", tipo: "papel" },
  { nome: "Garrafa de Vidro", tipo: "vidro" },
  { nome: "Sacola Plástica", tipo: "plastico" },
  { nome: "Tampa de Panela (metal)", tipo: "metal" }
];

let indiceAtual = 0;   // Guarda qual item está sendo mostrado
let pontuacao = 0;     // Guarda a pontuação do jogador

const itemAtualEl = document.getElementById("itemAtual");
const pontuacaoEl = document.getElementById("pontuacao");
const feedbackJogoEl = document.getElementById("feedbackJogo");
const botoesLixeira = document.querySelectorAll(".lixeira");

// Função para sortear e mostrar um novo item na tela
function mostrarNovoItem() {
  indiceAtual = Math.floor(Math.random() * itensJogo.length);
  itemAtualEl.textContent = itensJogo[indiceAtual].nome;
}

// Cada botão de lixeira verifica se o tipo escolhido está correto
botoesLixeira.forEach(function (botao) {
  botao.addEventListener("click", function () {
    const tipoEscolhido = botao.getAttribute("data-tipo");
    const tipoCorreto = itensJogo[indiceAtual].tipo;

    if (tipoEscolhido === tipoCorreto) {
      pontuacao++; // Soma ponto quando acerta
      feedbackJogoEl.textContent = "✅ Acertou!";
      feedbackJogoEl.style.color = "#1c7293";
    } else {
      feedbackJogoEl.textContent = "❌ Não é essa lixeira, tente prestar atenção no material.";
      feedbackJogoEl.style.color = "#d9534f";
    }

    // Atualiza a pontuação exibida na tela
    pontuacaoEl.textContent = pontuacao;

    // Mostra o próximo item automaticamente
    mostrarNovoItem();
  });
});

// Mostra um item assim que a página carrega
mostrarNovoItem();
