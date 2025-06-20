// Ter certeza que o formulário está sendo preenchido

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");

  form.addEventListener("submit", function (event) {
    const custoMetroField = document.getElementById("custoMetro");
    const custoComodoField = document.getElementById("custoComodo");
    const custoGaragemField = document.getElementById("custoGaragem");

    if (
      !custoMetroField.value ||
      !custoComodoField.value ||
      !custoGaragemField.value
    ) {
      event.preventDefault(); // Impede o envio do formulário
      alert("Por favor, preencha todos os campos do formulário.");
    }
  });
});

  //logica para que o preco da simulacao não seja string
  document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("form");
    var precoInput = document.getElementById("custo");
  
    form.addEventListener("submit", function(event) {
      // Converte o valor do campo de preço para um número de ponto flutuante
      var preco = parseFloat(custo.value.replace(",", "."));
  
      // Atualiza o valor do campo de preço com o número de ponto flutuante
      custo.value = preco;
    });
  });

  //lógica para mostrar o card de detalhes
// Aguarde o carregamento completo do documento
document.addEventListener("DOMContentLoaded", function() {
  // Selecione todos os botões de detalhes
  var detalhesButtons = document.querySelectorAll(".detalhes-btn");

  // Adicione um ouvinte de evento de clique a cada botão de detalhes
  detalhesButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      // Obtenha o ID da simulacao associado ao botão clicado (usando o atributo de dados)
      var simulacaoId = button.getAttribute("data-simulacao-id");

      // Construa o ID do card de detalhes usando o ID da simulacao
      var detalhesCardId = "detalhes-card-" + simulacaoId;

      // Encontre o card de detalhes com o ID correspondente
      var detalhesCard = document.getElementById(detalhesCardId);

      // Exiba o card de detalhes
      detalhesCard.style.display = "flex";

      // Selecione o botão de fechar dentro do card de detalhes
      var fecharDetalhesButton = detalhesCard.querySelector(".fechar-detalhes-btn");

      // Adicione um ouvinte de evento de clique ao botão de fechar
      fecharDetalhesButton.addEventListener("click", function() {
        // Oculte o card de detalhes ao clicar no botão de fechar
        detalhesCard.style.display = "none";
      });
    });
  });
});

