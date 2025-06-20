//Calculando o valor de produção------------------------

document.addEventListener('DOMContentLoaded', () => {
const cells = document.querySelectorAll('.custom-table td:nth-child(2)');

let somaValores = 0;

cells.forEach(cell => {
  const valor = parseFloat(cell.textContent.replace('R$ ', '').trim());
  somaValores += isNaN(valor) ? 0 : valor; 
});

const valorProducaoPlaceholder = document.getElementById('valorProducaoPlaceholder');
valorProducaoPlaceholder.textContent = `R$ ${somaValores.toFixed(2)}`;
});

// Calculando o custo por m²----------------

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.custom-table td:nth-child(2)');
    let somaValores = 0;
  
    cells.forEach(cell => {
      const valor = parseFloat(cell.textContent.replace('R$ ', '').trim());
      somaValores += isNaN(valor) ? 0 : valor;
    });
  
    const valorProducaoPlaceholder = document.getElementById('valorProducaoPlaceholder');
    valorProducaoPlaceholder.textContent = `R$ ${somaValores.toFixed(2)}`;
  
    const valorProducao = parseFloat(somaValores.toFixed(2));
  
    const metragemImovel = parseFloat(document.querySelector('.card:nth-child(2) p').textContent);
  
    const custoPorMetroQuadrado = isNaN(valorProducao) || isNaN(metragemImovel) ? NaN : valorProducao / metragemImovel;
  
    const custoPorMetroQuadradoPlaceholder = document.getElementById('custoPorMetroQuadradoPlaceholder');
    custoPorMetroQuadradoPlaceholder.textContent = isNaN(custoPorMetroQuadrado) ? 'Indisponível' : `R$ ${custoPorMetroQuadrado.toFixed(2)}`;
  });

  // função exportar PDF

  document.getElementById("exportarPDF").addEventListener("click", function() {
    const opcoes = {
      margin: 10,
      filename: 'acompanhamento_obra.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
  
    // Criando uma cópia temporária da página
    const copiaPagina = document.body.cloneNode(true);
  
    // Remove o elemento do cabeçalho da cópia
    const header = copiaPagina.querySelector('.navbar');
    if (header) {
      header.parentNode.removeChild(header);
    }
  
    // Exporta o restante do conteúdo (sem o cabeçalho)
    html2pdf().from(copiaPagina).set(opcoes).save();
  });
  

  //função imprimir

  document.getElementById("imprimir").addEventListener("click", function() {
    window.print(); // Inicia o processo de impressão da página atual
  });
  
  //redirecionar para central do cliente
const centralClienteButton = document.getElementById("centralClienteButton");

// Adiciona um evento de clique ao botão
centralClienteButton.addEventListener("click", function () {
  window.location.href = "/paginaCliente";
});

//redirecionar para central do adm
const centralAdmButton = document.getElementById("centralAdmButton");

// Adiciona um evento de clique ao botão
centralAdmButton.addEventListener("click", function () {
  window.location.href = "/paginaAdm";
});