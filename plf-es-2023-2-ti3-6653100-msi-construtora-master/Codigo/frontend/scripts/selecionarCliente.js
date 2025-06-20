// lógica para informar que o nenhum cliente foi selecionado
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const clienteSelect = document.getElementById("clienteSelecionado");

  form.addEventListener("submit", function (event) {
    // Verifique se algum cliente foi selecionado
    if (clienteSelect.value === "") {
      alert("Por favor, selecione um cliente antes de prosseguir.");
      event.preventDefault(); // Impede o envio do formulário se nenhum cliente for selecionado
    }
  });
});

//logica para informar que nenhuma obra foi selecionada
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const obraSelected = document.getElementById("obraSelecionada");

  form.addEventListener("submit", function (event) {
    // Verifique se alguma obra foi selecionada
    if (obraSelected.value === "") {
      alert("Por favor, selecione um obra antes de prosseguir.");
      event.preventDefault(); // Impede o envio do formulário se nenhuma obra for selecionada
    }
  });
});

//logica para informar que nenhuma obra do cliente foi selecionada
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const obraSelectedCliente = document.getElementById("obraSelecionadaCliente");

  form.addEventListener("submit", function (event) {
    // Verifique se alguma obra do cliente foi selecionada
    if (obraSelectedCliente.value === "") {
      alert("Por favor, selecione um obra antes de prosseguir.");
      event.preventDefault(); // Impede o envio do formulário se nenhuma obra for selecionada
    }
  });
});

//redirecionar para central do cliente
const centralButton = document.getElementById("centralButton");

// Adiciona um evento de clique ao botão
centralButton.addEventListener("click", function () {
  window.location.href = "/paginaCliente";
});

  
  //redirecionar para central do adm
  const centralAdmButton = document.getElementById("centralAdmButton");

  // Adiciona um evento de clique ao botão
  centralAdmButton.addEventListener("click", function () {
    window.location.href = "/paginaAdm";
  });