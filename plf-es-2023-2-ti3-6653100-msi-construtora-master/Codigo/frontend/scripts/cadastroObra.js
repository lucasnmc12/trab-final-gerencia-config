// Ter certeza que o formulário está sendo preenchido

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");

  form.addEventListener("submit", function (event) {
    const clienteField = document.getElementById("cliente");
    const enderecoField = document.getElementById("endereco");
    const cidadeField = document.getElementById("cidade");
    const terrenoField = document.getElementById("terreno");
    const dataField = document.getElementById("data");    
    const nComodosField = document.getElementById("nComodos");
    const garagemField1 = document.getElementById("sim");
    const garagemField2 = document.getElementById("nao");

    if (
      !clienteField.value ||
      !enderecoField.value ||
      !cidadeField.value ||
      !terrenoField.value ||
      !dataField.value ||
      !nComodosField.value ||
      (!garagemField1.checked && !garagemField2.checked)
    ) {
      event.preventDefault(); // Impede o envio do formulário
      alert("Por favor, preencha todos os campos do formulário.");
    }
  });
});

//logica para confirmar o excluir obra
document.addEventListener("DOMContentLoaded", function() {
  var deleteButtons = document.querySelectorAll(".deleteBtn");

  deleteButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
      event.preventDefault();
      var confirmDelete = confirm("Você tem certeza que deseja excluir esta obra?");
      
      if (confirmDelete) {
        // Se o usuário confirmar, continuar com a exclusão
        var form = event.target.parentElement;
        form.submit();
      } else {
        // Se o usuário cancelar, não fazer nada
        return false;
      }
    });
  });
});
  
  //lógica para mostrar o card de detalhes

document.addEventListener("DOMContentLoaded", function() {
    // Selecione todos os botões de detalhes
    var detalhesButtons = document.querySelectorAll(".detalhes-btn");
  
    // Adicione um ouvinte de evento de clique a cada botão de detalhes
    detalhesButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        // Obtenha o ID do material associado ao botão clicado (usando o atributo de dados)
        var obraId = button.getAttribute("data-material-id");
  
        // Construa o ID do card de detalhes usando o ID do material
        var detalhesCardId = "detalhes-card-" + obraId;
  
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

  //redirecionar para central do adm
  const centralAdmButton = document.getElementById("centralButton");

  // Adiciona um evento de clique ao botão
  centralAdmButton.addEventListener("click", function () {
    window.location.href = "/paginaAdm";
  });  
  