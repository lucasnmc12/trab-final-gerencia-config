// Ter certeza que o formulário está sendo preenchido

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form"); // ID do formulário
  
    form.addEventListener("submit", function (event) {
      const nomeField = document.getElementById("nome");
      const cpfField = document.getElementById("cpf");
      const cidadeField = document.getElementById("cidade");
      const estadoField = document.getElementById("estado");
      const enderecoField = document.getElementById("endereco");
      const telefoneField = document.getElementById("telefone");
      const emailField = document.getElementById("email");
      const senhaField = document.getElementById("senha");
  
      // Verifique se todos os campos obrigatórios estão preenchidos
      if (
        !nomeField.value ||
        !cpfField.value ||
        !cidadeField.value ||
        !estadoField.value ||
        !enderecoField.value ||
        !telefoneField.value ||
        !emailField.value ||
        !senhaField.value
      ) {
        event.preventDefault(); // Impede o envio do formulário
        alert("Por favor, preencha todos os campos do formulário.");
      }
    });
  });
  
//redirecionar para central do cliente
const homeButton = document.getElementById("homeButton");

// Adiciona um evento de clique ao botão
homeButton.addEventListener("click", function () {
  window.location.href = "/login";
});