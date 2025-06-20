// Ter certeza que o formulário está sendo preenchido

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");

    form.addEventListener("submit", function (event) {
      const cnpjField = document.getElementById("cnpj");
      const nomeField = document.getElementById("nome");
      const telefoneField = document.getElementById("telefone");
      const emailField = document.getElementById("email");

      if (
        !cnpjField.value ||
        !nomeField.value ||
        !telefoneField.value ||
        !emailField.value 
      ) {
        event.preventDefault(); // Impede o envio do formulário
        alert("Por favor, preencha todos os campos do formulário.");
      }
    });
  });
  //redirecionar para central do adm
  const centralAdmButton = document.getElementById("centralButton");

  // Adiciona um evento de clique ao botão
  centralAdmButton.addEventListener("click", function () {
    window.location.href = "/paginaAdm";
  });  
  