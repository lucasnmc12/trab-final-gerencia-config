//logica para confirmar o excluir fornecedor
document.addEventListener("DOMContentLoaded", function() {
    var deleteButtons = document.querySelectorAll(".button-3");

    deleteButtons.forEach(function(button) {
      button.addEventListener("click", function(event) {
        event.preventDefault();
        var confirmDelete = confirm("Você tem certeza que deseja excluir este fornecedor?");
        
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
    var detalhesButtons = document.querySelectorAll(".detalhes-btn");
    var fecharDetalhesButtons = document.querySelectorAll(".fechar-detalhes-btn");
  
    detalhesButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        var cnpj = button.getAttribute("data-cnpj");
        var detalhesCard = document.getElementById("detalhes-card-" + cnpj);
        detalhesCard.style.display = "flex";
      });
    });
  
    fecharDetalhesButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        var detalhesCard = button.parentElement.parentElement;
        detalhesCard.style.display = "none";
      });
    });
  });
  
  //redirecionar para central do cliente
  const centralButton = document.getElementById("centralButton");

  // Adiciona um evento de clique ao botão
  centralButton.addEventListener("click", function () {
    window.location.href = "/paginaAdm";
  });