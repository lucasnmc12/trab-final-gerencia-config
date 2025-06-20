// Ter certeza que o formulário está sendo preenchido

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");

    form.addEventListener("submit", function (event) {
        const terrenoField = document.getElementById("terreno");
        const comodostipoField = document.getElementById("comodos");

        if (!terrenoField.value || 
            !comodostipoField.value ||
            garagemField1.value ||
            garagemField2.value) {
            event.preventDefault(); // Impede o envio do formulário
            alert("Por favor, preencha todos os campos do formulário.");
        }
    });
});
 
  
//logica para calular a simulação
// Obtém os elementos <div> correspondentes aos custos
const custoMaterialDiv = document.getElementById('custoMaterial');
const custoMaoDeObraDiv = document.getElementById('custoMaoDeObra');
const custoTotalDiv = document.getElementById('custoTotal');

// Define o valor padrão para cada custo
custoMaterialDiv.textContent = 'R$ 00,00';
custoMaoDeObraDiv.textContent = 'R$ 00,00';
custoTotalDiv.textContent = 'R$ 00,00';

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const custoMaterialDiv = document.getElementById('custoMaterial');
    const custoMaoDeObraDiv = document.getElementById('custoMaoDeObra');
    const custoTotalDiv = document.getElementById('custoTotal');

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio do formulário
        const terreno = parseFloat(document.getElementById('terreno').value);
        const comodos = parseInt(document.getElementById('comodos').value);
        const garagem = document.querySelector('input[name="garagem"]:checked').value === 'true';
        let custoMaterial = 0;
        let custoMaoDeObra = 0;

        // Adicione sua lógica de cálculo para custo de materiais aqui
        custoMaterial = terreno * 150; // Cálculo de exemplo para o custo de materiais

        // Calcule o custo de mão de obra com base na seleção de garagem
        if (garagem) {
            custoMaoDeObra = comodos * 1250 + 5000; // Adicione um valor adicional para a garagem
        } else {
            custoMaoDeObra = comodos * 1000; // Cálculo de exemplo para o custo de mão de obra sem garagem
        }

        // Calcule o custo total
        const custoTotal = custoMaterial + custoMaoDeObra;

        // Atualize os campos do formulário com os resultados
        custoMaterialDiv.textContent = `R$ ${custoMaterial.toFixed(2)}`;
        custoMaoDeObraDiv.textContent = `R$ ${custoMaoDeObra.toFixed(2)}`;
        custoTotalDiv.textContent = `R$ ${custoTotal.toFixed(2)}`;
    });

    const buttonReset = document.getElementById('buttonSubmit2');
    buttonReset.addEventListener('click', function (event) {
        // Defina os valores padrão para os elementos de custo
        custoMaterialDiv.textContent = 'R$ 00,00';
        custoMaoDeObraDiv.textContent = 'R$ 00,00';
        custoTotalDiv.textContent = 'R$ 00,00';

        // Restaure os valores padrão para os campos de entrada, se necessário
        document.getElementById('terreno').value = '';
        document.getElementById('comodos').value = '';
        // Restaure os valores padrão para os botões de rádio, se necessário
        const radioButtons = document.querySelectorAll('input[name="garagem"]');
        radioButtons.forEach(function (radio) {
            if (radio.value === 'false') {
                radio.checked = true;
            } else {
                radio.checked = false;
            }
        });
    });
});

//redirecionar para central do cliente
const centralButton = document.getElementById("centralButton");

// Adiciona um evento de clique ao botão
centralButton.addEventListener("click", function () {
  window.location.href = "/paginaCliente";
});
