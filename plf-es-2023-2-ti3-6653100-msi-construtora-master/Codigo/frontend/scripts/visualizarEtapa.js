// logica para o carrossel
$(document).ready(function(){
    $('.etapas-carousel').slick({
      // Configurações do carrossel, consulte a documentação do Slick Carousel
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true,
    });
  });

    //logica para confirmar o excluir item
    document.addEventListener("DOMContentLoaded", function() {
      var deleteButtons = document.querySelectorAll(".deleteBtn");
  
      deleteButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
          event.preventDefault();
          var confirmDelete = confirm("Você tem certeza que deseja excluir este item?");
          
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
    
  //logica para que o preco do item não seja string
  document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("form");
    var valorInput = document.getElementById("valorInput");
  
    form.addEventListener("submit", function(event) {
      // Converte o valor do campo de preço para um número de ponto flutuante
      var valor = parseFloat(valorInput.value.replace(",", "."));
  
      // Atualiza o valor do campo de preço com o número de ponto flutuante
      valorInput.value = valor;
    });
  });

//Calculando o valor recebido------------------------

document.addEventListener('DOMContentLoaded', () => {
  fetch('/itensPagos')
    .then((response) => response.json())
    .then((data) => {
      const totalValorItensPagos = data.totalValorItensPagos || 0;
      const valorRecebidoPlaceholder = document.getElementById('valorRecebidoPlaceholder');
      valorRecebidoPlaceholder.textContent = `R$ ${totalValorItensPagos.toFixed(2)}`;
    })
    .catch((error) => {
      console.error('Erro ao buscar o valor total dos itens pagos:', error);
    });
});

//Calculando o valor total dos itens-------------

document.addEventListener('DOMContentLoaded', () => {
  fetch('/totalItens')
    .then((response) => response.json())
    .then((data) => {
      const totalValorItens = data.totalValorItens || 0;
      const valorTotalPlaceholder = document.getElementById('valorTotalPlaceholder');
      valorTotalPlaceholder.textContent = `R$ ${totalValorItens.toFixed(2)}`;
    })
    .catch((error) => {
      console.error('Erro ao buscar o valor total dos itens cadastrados:', error);
    });
});

//Calculando o valor restante dos itens-------------

document.addEventListener('DOMContentLoaded', () => {
  fetch('/itensRestante')
    .then((response) => response.json())
    .then((data) => {
      const totalValorItensPagos = data.totalValorItensPagos || 0;
      const valorRestantePlaceholder = document.getElementById('valorRestantePlaceholder');
      valorRestantePlaceholder.textContent = `R$ ${totalValorItensPagos.toFixed(2)}`;
    })
    .catch((error) => {
      console.error('Erro ao buscar o valor total dos itens pagos:', error);
    });
});
  
  //redirecionar para central do adm
  const centralAdmButton = document.getElementById("centralButton");

  // Adiciona um evento de clique ao botão
  centralAdmButton.addEventListener("click", function () {
    window.location.href = "/paginaAdm";
  });