// Redirecionando para a pagina de login
const loginButton = document.getElementById("loginButton");

// Adiciona um evento de clique ao botão
loginButton.addEventListener("click", function () {
  window.location.href = "/login";
});

// Redirecionando para a pagina de login

// Redirecionando para a página de cadastro
const cadastrarButton1 = document.getElementById("cadastrarButton1");
const cadastrarButton2 = document.getElementById("cadastrarButton2");
const cadastrarButton3 = document.getElementById("cadastrarButton3");

cadastrarButton1.addEventListener("click", function () {
  window.location.href = "/cadastroCliente";
});

cadastrarButton2.addEventListener("click", function () {
    window.location.href = "/cadastroCliente";
  });

cadastrarButton3.addEventListener("click", function () {
  window.location.href = "/cadastroCliente";
});