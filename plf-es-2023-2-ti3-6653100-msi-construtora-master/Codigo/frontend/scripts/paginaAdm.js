
    //Redirecionar para gerenciar fornecedores

    const fornecedoresBtn = document.getElementById("fornecedoresBtn");

    fornecedoresBtn.addEventListener("click", function () {
      window.location.href = "/listarFornecedores";
    });


    //Redirecionar para gerenciar fornecedores

    const acompanhamentoBtn = document.getElementById("acompanhamentoBtn");

    acompanhamentoBtn.addEventListener("click", function () {
      window.location.href = "/selecionarCliente";
    });

    //Redirecionar para gerenciar obras

    const obrasBtn = document.getElementById("obrasBtn");

    obrasBtn.addEventListener("click", function () {
      window.location.href = "/crudObra";
    });

    //Redirecionar para gerenciar materiais

    const materiaisBtn = document.getElementById("materiaisBtn");

    materiaisBtn.addEventListener("click", function () {
      window.location.href = "/crudMaterial";
    });
  
        //Redirecionar para gerenciar serviço

        const servicoBtn = document.getElementById("servicoBtn");

        servicoBtn.addEventListener("click", function () {
          window.location.href = "/crudServico";
        });