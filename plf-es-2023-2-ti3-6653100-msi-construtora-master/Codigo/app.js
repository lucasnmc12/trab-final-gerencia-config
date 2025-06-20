// Incluindo as bibliotecas
// Gerencia as requisições, rotas e URLs, entre outras funcionalidades

const express = require("express");

// Chamar a função express
const app = express();
const path = require("path");

const session = require("express-session");

// Configurar o middleware de sessão
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

// Importando o body- parser
const bodyParser = require("body-parser");
// Configurar o body-parser para analisar solicitações JSON
app.use(bodyParser.json());
// Configurar o body-parser para analisar solicitações com dados de formulário
app.use(bodyParser.urlencoded({ extended: true }));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "./frontend")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend/views"));
// Configurar o middleware para servir arquivos estáticos
app.use("/styles", express.static("/styles"));

// Constante das classes
const fornecedor = require("./backend/models/Fornecedor");
const cliente = require("./backend/models/Cliente");
const material = require("./backend/models/Material");
const obra = require("./backend/models/Obra");
const servico = require("./backend/models/Servico");
const custo = require("./backend/models/Custo");
const etapa = require("./backend/models/Etapa");
const item = require("./backend/models/Item");

/** ROTAS **/

// Rota do tipo GET direcionado a raiz do projeto

app.get("/index", function (req, res) {
  res.render("index");
});

/***************************  ROTAS DO CLIENTE **/

//Rota do tipo GET direcionando para a página principal

app.get("/homepage", (req, res) => {
  res.render("homepage");
});


// Rota do tipo GET direcionado o login de clientes

app.get("/login", (req, res) => {
  res.render("login");
});

// Rota do tipo POST que autentifica o login e redireciona para pagina do cliente
app.post("/login", function (req, res) {
  const email = req.body.email;
  const senha = req.body.senha;

  // Verifica se as credenciais estão corretas
  cliente.findOne({
    where: {
      emailCliente: email,
      senhaCliente: senha,
    },
  }).then(function (cliente) {
    if (cliente) {
      if (cliente.isAdmin) {
        // Redireciona para a página do administrador
        res.redirect("/paginaAdm");
      } else {
        // Redireciona para a página do cliente
        req.session.clienteId = cliente.idCliente;
        const clienteId = req.session.clienteId;
        res.render("paginaCliente", { idCliente: clienteId });
      }
    } else {
      // Tratar credenciais inválidas para ambos (cliente e administrador)
      const errorMessage = 'Email e/ou senha incorretos.';
      res.render("login", { error: errorMessage });
    }
  });
});

//Rota do tipo GET direcionando a pagina dos clientes

app.get("/paginaCliente", (req, res) => {
  const clienteId = req.session.clienteId;
  res.render("paginaCliente", { idCliente: clienteId });
});

// Rota do tipo GET direcionado a cadastro de clientes

app.get("/cadastroCliente", (req, res) => {
  res.render("cadastroCliente");
});

// Rota do tipo POST para criar o cadastro do cliente, caso já não existir com mesmo email no BD

app.post("/clienteCadastrado", (req, res) => {
  const email = req.body.email;

  // Verifica se já existe um cliente com o mesmo email

  cliente
    .findOne({
      where: {
        emailCliente: email,
      },
    })
    .then(function (Cliente) {
      if (Cliente) {
        //        const errorMessage = 'O email informado já está em uso. Por favor, utilize outro email.';
        //        res.redirect('/loginPaciente?error=' + encodeURIComponent(errorMessage));
        res.send(
          "O email informado já está em uso. Por favor, utilize outro email."
        );
      } else {
        // Se não existe um paciente com o mesmo email, cria o cadastro
        cliente
          .create({
            nomeCliente: req.body.nome,
            cpfCliente: req.body.cpf,
            cidadeCliente: req.body.cidade,
            estadoCliente: req.body.estado,
            enderecoCliente: req.body.endereco,
            telefoneCliente: req.body.telefone,
            emailCliente: email,
            senhaCliente: req.body.senha,
            isAdmin: false,
          })
          .then(() => {
            res.redirect("/login");
          });
      }
    })
    .catch(function (erro) {
      res.send("Erro ao verificar o email do cliente: " + erro);
    });
});

// Rota para mostrar o formulário de edição de clientes

app.get("/editarCliente/:idCliente", (req, res) => {
  const clienteId = req.session.clienteId;
  // Encontrar o material pelo ID no banco de dados
  cliente
    .findByPk(clienteId)
    .then((cliente) => {
      // Renderizar a página de edição com as informações do cliente
      res.render("editarCliente", { cliente, idCliente: clienteId });
    })
    .catch((erro) => {
      res.send("Erro ao buscar cliente: " + erro);
    });
});

//Rota do tipo POST para editar informações dos clientes
app.post("/editarCliente/:idCliente", (req, res) => {
  const clienteId = req.session.clienteId;
  // Encontrar o cliente pelo ID no banco de dados
  cliente
    .findByPk(clienteId)
    .then((cliente) => {
      if (cliente) {
        cliente.nomeCliente = req.body.nome;
        cliente.cidadeCliente = req.body.cidade;
        cliente.estadoCliente = req.body.estado;
        cliente.enderecoCliente = req.body.endereco;
        cliente.telefoneCliente = req.body.telefone;
        cliente.emailCliente = req.body.email;
        cliente.senhaCliente = req.body.senha;

        // Salvar as alterações no banco de dados
        return cliente.save();
      } else {
        // Fornecedor não encontrado, redirecionar para uma página de erro ou tratar de acordo com sua lógica
        res.send("Cliente não encontrado");
      }
    })
    .then(() => {
      // Redirecionar para a página de visualização do cliente após a edição
      res.redirect("/paginaCliente");
    })
    .catch((erro) => {
      // Lidar com erros
      res.send("Erro ao editar cliente: " + erro);
    });
});

//***************ROTAS SIMULACAO FINANCIAMENTO

// Rota do tipo GET para a simulação de financiamento
app.get("/simulacaoFinanciamento", (req, res) => {
  res.render("simulacaoFinanciamento");
});

// Rota do tipo GET para a editar base de dados
app.get("/cadastroCusto", (req, res) => {
  res.render("cadastroCusto");
});

// Rota do tipo POST para a editar base de dados
app.post("/custoCadastrado", (req, res) => {
  custo
    .create({
      custoMetro: req.body.custoMetro,
      custoComodo: req.body.custoComodo,
      custoGaragem: req.body.custoGaragem,
    })
    .then(function () {
      res.render("cadastroCusto");
    })
    .catch(function (erro) {
      res.send("Erro ao cadastrar custo!" + erro);
    });
});

// Rota do tipo GET para listar as histórico de custo

app.get("/historicoCustos", (req, res) => {
  custo
    .findAll()
    .then((custos) => {
      res.render("historicoCustos", { custos });
    })
    .catch((erro) => {
      res.send("Erro ao buscar histórico de custos" + erro);
    });
});

/*************************  ROTAS DO ADMINISTRADOR **/


// Rota do tipo GET para a tela do administrador
app.get("/paginaAdm", (req, res) => {
  res.render("paginaAdm");
});

/*************************  ROTAS DOS MATERIAIS **/

// Rota para renderizar o formulário de cadastro de material
app.get("/cadastroMaterial", async (req, res) => {
  try {
    const fornecedores = await fornecedor.findAll();
    res.render("cadastroMaterial", { fornecedores });
  } catch (erro) {
    console.error("Erro ao buscar fornecedores", erro);
    res.send("Erro ao buscar fornecedores");
  }
});

// Rota do tipo POST para criar um material
app.post("/materialCadastrado", (req, res) => {
  material
    .create({
      nomeMaterial: req.body.nome,
      precoMaterial: req.body.preco,
      tipoMaterial: req.body.tipo,
      fk_idFornecedor: req.body.fornecedor,
      descricaoMaterial: req.body.descricao,
    })
    .then(function () {
      //    res.render("fornecedorCadastrado");
      //    res.sendFile(path.join(__dirname, "/frontend/views/fornecedorCadastrado.html"));
      res.redirect("/crudMaterial");
    })
    .catch(function (erro) {
      res.send("Erro ao cadastrar material!" + erro);
    });
});

// Rota do tipo GET para listar todos os materiais com os fornecedores associados
app.get("/crudMaterial", (req, res) => {
  material
    .findAll({
      include: [fornecedor], // Inclui a tabela de fornecedores na consulta
    })
    .then((materiais) => {
      res.render("crudMaterial", { materiais });
    })
    .catch((erro) => {
      res.send("Erro ao buscar materiais" + erro);
    });
});

// Rota do tipo POST para excluir um material
app.post("/excluirMaterial/:id", (req, res) => {
  const materialId = req.params.id;

  // Definir a chave estrangeira como NULL para desvincular o material do fornecedor
  material
    .update({ fk_idFornecedor: null }, { where: { idMaterial: materialId } })
    .then(() => {
      return material.destroy({ where: { idMaterial: materialId } });
    })
    .then(() => {
      res.redirect("/crudMaterial");
    })
    .catch((erro) => {
      res.send("Erro ao excluir material!" + erro);
    });
});

// Rota para mostrar o formulário de edição de material
app.get("/editarmaterial/:id", (req, res) => {
  const materialId = req.params.id;
  // Encontrar o material pelo ID no banco de dados
  material
    .findByPk(materialId)
    .then((material) => {
      // Renderizar a página de edição com as informações do material
      res.render("editarMaterial", { material, id: materialId });
    })
    .catch((erro) => {
      res.send("Erro ao buscar material: " + erro);
    });
});

// Rota para manipular a edição do material
app.post("/editarMaterial/:id", (req, res) => {
  const materialId = req.params.id;
  // Encontrar o material pelo ID no banco de dados
  material
    .findByPk(materialId)
    .then((material) => {
      // Verificar se o material foi encontrado
      if (material) {
        // Atualizar as propriedades do material com os dados do formulário
        material.nomeMaterial = req.body.nome;
        material.precoMaterial = req.body.preco;
        material.tipoMaterial = req.body.tipo;
        material.descricaoMaterial = req.body.descricao;
        // Salvar as alterações no banco de dados
        return material.save();
      } else {
        // Material não encontrado, redirecionar para uma página de erro ou tratar de acordo com sua lógica
        res.send("Material não encontrado");
      }
    })
    .then(() => {
      // Redirecionar para a página de visualização do material após a edição
      res.redirect("/crudMaterial");
    })
    .catch((erro) => {
      // Lidar com erros
      res.send("Erro ao editar material: " + erro);
    });
});

/*************************  ROTAS DO SERVIÇO DE OBRA  **/

// Rota do tipo GET que redireciona para o cadastro de serviço de obra

app.get("/cadastroServico", async (req, res) => {
  try {
    const obras = await obra.findAll();
    res.render("cadastroServico", { obras });
  } catch (erro) {
    console.error("Erro ao carregar o cadastro de serviços de obra", erro);
    res.send("Erro ao carregar o cadastro de serviços de obra");
  }
});

// Rota POST para o cadastro de serviço de obra

app.post("/servicoCadastrado", (req, res) => {
  servico
    .create({
      fk_idObra: req.body.obra,
      tipoServico: req.body.tipo,
      descricaoServico: req.body.descricao,
      dataContratacao: req.body.data,
      valorServico: req.body.valor,
    })
    .then(() => {
      res.redirect("/crudServico");
    })
    .catch((error) => {
      res.send("Erro ao cadastrar servico!" + error);
    });
});

// Rota do tipo GET que redireciona para o crud de serviço de obra

app.get("/crudServico", (req, res) => {
  servico
    .findAll({
      include: [{ model: obra }], // Inclui a tabela de obra na consulta
    })
    .then((servicos) => {
      res.render("crudServico", { servicos });
    })
    .catch((erro) => {
      res.send("Erro ao buscar serviços de obra" + erro);
    });
});

// Rota para mostrar o formulário de edição de serviços
app.get("/editarServico/:id", (req, res) => {
  const servicoId = req.params.id;
  // Encontrar o serviços pelo ID no banco de dados
  servico
    .findByPk(servicoId)
    .then((servico) => {
      // Renderizar a página de edição com as informações do serviço
      res.render("editarServico", { servico, id: servicoId });
    })
    .catch((erro) => {
      res.send("Erro ao buscar servico de obra: " + erro);
    });
});

// Rota para manipular a edição do material
app.post("/editarServico/:id", (req, res) => {
  const servicoId = req.params.id;
  // Encontrar a obra pelo ID no banco de dados
  servico
    .findByPk(servicoId)
    .then((servico) => {
      // Verificar se a servico foi encontrado
      if (servico) {
        // Atualizar as propriedades do obra com os dados do formulário
        servico.tipoServico = req.body.tipo;
        servico.descricaoServico = req.body.descricao;
        servico.dataContratacao = req.body.data;
        servico.valorServico = req.body.valor;
        // Salvar as alterações no banco de dados
        return servico.save();
      } else {
        // Serviço não encontrado, redirecionar para uma página de erro ou tratar de acordo com sua lógica
        res.send("Servico de obra não encontrado");
      }
    })
    .then(() => {
      // Redirecionar para a página de visualização do serviço após a edição
      res.redirect("/crudServico");
    })
    .catch((erro) => {
      // Lidar com erros
      res.send("Erro ao editar serviço de obra: " + erro);
    });
});

// Rota do tipo POST para excluir um serviço de obra
app.post("/excluirServico/:id", (req, res) => {
  const servicoId = req.params.id;
  servico
    .destroy({
      where: {
        idServico: servicoId,
      },
    })
    .then(function () {
      res.redirect("/crudServico");
    })
    .catch(function (erro) {
      res.send("Erro ao excluir serviço de obra! " + erro);
    });
});

/*************************  ROTAS DAS OBRAS **/

// Rota do tipo POST para criar uma obra

// Rota para renderizar o formulário de cadastro de material
app.get("/cadastroObra", async (req, res) => {
  try {
    const clientes = await cliente.findAll({
      where: {
        isAdmin: false, 
      },
    });
    res.render("cadastroObra", { clientes });
  } catch (erro) {
    console.error("Erro ao carregar o cadastro de obra", erro);
    res.send("Erro ao carregar o cadastro de obra");
  }
});

app.post("/obraCadastrada", (req, res) => {
  obra
    .create({
      fk_idCliente: req.body.cliente,
      enderecoObra: req.body.endereco,
      cidadeObra: req.body.cidade,
      tamanhoTerrenoObra: req.body.terreno,
      dataInicioObra: req.body.data,
      qtdComodosObra: req.body.nComodos,
      garagemObra: req.body.garagem,
    })
    .then(() => {
      res.redirect("/crudObra");
    })
    .catch((error) => {
      res.send("Erro ao cadastrar obra!" + error);
    });
});

// Rota do tipo GET para listar todos as obras com os clientes associados
app.get("/crudObra", (req, res) => {
  obra
    .findAll({
      include: [{ model: cliente }], // Inclui a tabela de clientes na consulta
    })
    .then((obras) => {
      res.render("crudObra", { obras });
    })
    .catch((erro) => {
      res.send("Erro ao buscar obras" + erro);
    });
});

// Rota para mostrar o formulário de edição de material
app.get("/editarobra/:id", (req, res) => {
  const obraId = req.params.id;
  // Encontrar o material pelo ID no banco de dados
  obra
    .findByPk(obraId)
    .then((obra) => {
      // Renderizar a página de edição com as informações do material
      res.render("editarObra", { obra, id: obraId });
    })
    .catch((erro) => {
      res.send("Erro ao buscar obra: " + erro);
    });
});

// Rota para manipular a edição do material
app.post("/editarObra/:id", (req, res) => {
  const obraId = req.params.id;
  // Encontrar a obra pelo ID no banco de dados
  obra
    .findByPk(obraId)
    .then((obra) => {
      // Verificar se a obra foi encontrado
      if (obra) {
        // Atualizar as propriedades do obra com os dados do formulário
        obra.enderecoObra = req.body.endereco;
        obra.cidadeObra = req.body.cidade;
        obra.tamanhoTerrenoObra = req.body.terreno;
        obra.qtdComodosObra = req.body.nComodos;
        obra.garagemObra = req.body.garagem;
        // Salvar as alterações no banco de dados
        return obra.save();
      } else {
        // Obra não encontrado, redirecionar para uma página de erro ou tratar de acordo com sua lógica
        res.send("obra não encontrado");
      }
    })
    .then(() => {
      // Redirecionar para a página de visualização do obra após a edição
      res.redirect("/crudObra");
    })
    .catch((erro) => {
      // Lidar com erros
      res.send("Erro ao editar obra: " + erro);
    });
});

// Rota do tipo POST para excluir uma obra
app.post("/excluirObra/:id", (req, res) => {
  const obraId = req.params.id;

  obra
    .destroy({
      where: {
        idObra: obraId,
      },
    })
    .then(function () {
      res.redirect("/crudObra");
    })
    .catch(function (erro) {
      res.send("Erro ao excluir obra! " + erro);
    });
});

/*************************  ROTAS DO ACOMPANHAMENTO DE OBRA **/


// Rota do tipo GET para a página de selecionar cliente
app.get("/selecionarCliente", async (req, res) => {
  try {
    const clientes = await cliente.findAll({
      where: {
        isAdmin: false, 
      },
    });
    res.render("selecionarCliente", { clientes });
  } catch (error) {
    console.error("Erro ao obter dados do banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota do tipo POST para processar a seleção de cliente e redirecionar para a página de selecionar obra
app.post("/selecionarObra", async (req, res) => {
  const { clienteSelecionado } = req.body;
  req.session.clienteId = clienteSelecionado;
  try {
    const obras = await obra.findAll({
      where: { fk_idCliente: clienteSelecionado },
    });
    res.render("selecionarObra", { obras });
  } catch (error) {
    console.error("Erro ao obter dados do banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota do tipo POST para processar a seleção de obra e redirecionar para a página de acompanhamento de obra
app.post("/acompanhamentoObra", async (req, res) => {
  const { obraSelecionada } = req.body;
  req.session.obraId = obraSelecionada;

  try {
    // Obtenha as informações da obra selecionada
    const obraSelecionadaInfo = await obra.findByPk(obraSelecionada);
    const etapas = await etapa.findAll({
      where: { fk_idObra: obraSelecionada },
    });

    // Array para armazenar as informações das etapas com a soma dos valores dos itens
    const etapasComSomaDeValores = [];

    for (const etapa of etapas) {
      // Encontra todos os itens associados a esta etapa
      const itensDaEtapa = await item.findAll({
        where: { fk_idEtapa: etapa.idEtapa },
      });

      // Calcula a soma dos valores dos itens da etapa atual
      let totalValorItens = 0;
      for (const itemDaEtapa of itensDaEtapa) {
        totalValorItens += itemDaEtapa.valorItem || 0;
      }

      // Adiciona as informações da etapa com a soma dos valores dos itens ao array
      etapasComSomaDeValores.push({
        etapa,
        totalValorItens,
      });
    }

    // Renderize a página de acompanhamento de obra, passando as etapas com a soma dos valores e informações da obra selecionada
    res.render("acompanhamentoObra", {
      etapas: etapasComSomaDeValores,
      tamanhoTerreno: obraSelecionadaInfo.tamanhoTerrenoObra,
    });
  } catch (error) {
    console.error("Erro ao obter dados do banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.get("/itensPagos", async (req, res) => {
  const obraSelecionada = req.session.obraId;
  try {
    // Encontra todos os itens pagos associados às etapas da obra selecionada
    const itensPagos = await item.findAll({
      where: {
        pagamentoItem: true,
      },
      include: {
        model: etapa,
        where: { fk_idObra: obraSelecionada },
      },
    });

    let totalValorItensPagos = 0;

    itensPagos.forEach((item) => {
      totalValorItensPagos += item.valorItem || 0;
    });

    res.status(200).json({ totalValorItensPagos });
  } catch (error) {
    console.error("Erro ao buscar itens pagos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});


// Rota para calcular o valor total dos itens
app.get("/totalItens", async (req, res) => {
  const obraSelecionada = req.session.obraId;
  try {
    // Encontra todos os itens associados às etapas da obra selecionada
    const totalItens = await item.findAll({
      include: {
        model: etapa,
        where: { fk_idObra: obraSelecionada },
      },
    });

    let totalValorItens = 0;
    totalItens.forEach((item) => {
      totalValorItens += item.valorItem || 0;
    });

    res.status(200).json({ totalValorItens });
  } catch (error) {
    console.error("Erro ao buscar total dos itens:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});


app.get("/itensRestante", async (req, res) => {
  const obraSelecionada = req.session.obraId;
  try {
    // Encontra todos os itens pagos associados às etapas da obra selecionada
    const itensRestante = await item.findAll({
      where: {
        pagamentoItem: false,
      },
      include: {
        model: etapa,
        where: { fk_idObra: obraSelecionada },
      },
    });

    let totalValorItensPagos = 0;

    itensRestante.forEach((item) => {
      totalValorItensPagos += item.valorItem || 0;
    });

    res.status(200).json({ totalValorItensPagos });
  } catch (error) {
    console.error("Erro ao buscar itens pagos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});


// Rota do tipo POST para processar a seleção de cliente e redirecionar para a página de selecionar obra
app.get("/selecionarObraCliente", async (req, res) => {
  const clienteId = req.session.clienteId;
  try {
    const obras = await obra.findAll({
      where: { fk_idCliente: clienteId },
    });
    res.render("selecionarObraCliente", { obras });
  } catch (error) {
    console.error("Erro ao obter dados do banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota do tipo GET direcionado a acompanhamentoObraCliente

app.post("/acompanhamentoObraCliente", async (req, res) => {
  const { obraSelecionadaCliente } = req.body;
  req.session.obraId = obraSelecionadaCliente;
  try {
    // Obtenha as informações da obra selecionada
    const obraSelecionadaInfo = await obra.findByPk(obraSelecionadaCliente);
    const etapas = await etapa.findAll({
      where: { fk_idObra: obraSelecionadaCliente },
    });

    // Array para armazenar as informações das etapas com a soma dos valores dos itens
    const etapasComSomaDeValores = [];

    for (const etapa of etapas) {
      // Encontra todos os itens associados a esta etapa
      const itensDaEtapa = await item.findAll({
        where: { fk_idEtapa: etapa.idEtapa },
      });

      // Calcula a soma dos valores dos itens da etapa atual
      let totalValorItens = 0;
      for (const itemDaEtapa of itensDaEtapa) {
        totalValorItens += itemDaEtapa.valorItem || 0;
      }

      // Adiciona as informações da etapa com a soma dos valores dos itens ao array
      etapasComSomaDeValores.push({
        etapa,
        totalValorItens,
      });
    }

    // Renderize a página de acompanhamento de obra, passando as etapas com a soma dos valores e informações da obra selecionada
    res.render("acompanhamentoObraCliente", {
      etapas: etapasComSomaDeValores,
      tamanhoTerreno: obraSelecionadaInfo.tamanhoTerrenoObra,
    });
  } catch (error) {
    console.error("Erro ao obter dados do banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

/*************************  CADASTRO DE ETAPA **/

// Rota do tipo GET para a página de cadastro de etapa
app.get("/cadastroEtapa", (req, res) => {
  res.render("cadastroEtapa");
});

// Rota do tipo POST para criar um nova etapa
app.post("/etapaCadastrada", (req, res) => {
  const obraId = req.session.obraId;

  // Verifique se dataFim está vazio
  const { dataFim } = req.body;
  const dataFimDB = dataFim ? dataFim : null;

  etapa
    .create({
      fk_idObra: obraId,
      nomeEtapa: req.body.nome,
      dataInicio: req.body.dataInicio,
      dataFim: dataFimDB,
      statusObra: req.body.status,
    })
    .then(function () {
      res.redirect("/visualizarEtapa");
    })
    .catch(function (erro) {
      res.send("Erro ao cadastrar etapa!" + erro);
    });
});

// Rota do tipo GET para a página de visualizar etapa
app.get("/visualizarEtapa", async (req, res) => {
  const obraId = req.session.obraId;
  try {
    const etapas = await etapa.findAll({
      where: { fk_idObra: obraId },
    });

    // Mapeia as etapas para buscar os itens associados a cada etapa
    const etapasComItens = await Promise.all(
      etapas.map(async (etapa) => {
        const itens = await item.findAll({
          where: { fk_idEtapa: etapa.idEtapa },
        });
        return { etapa, itens };
      })
    );

    res.render("visualizarEtapa", { etapasComItens });
  } catch (error) {
    console.error("Erro ao obter dados do banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.delete("/excluirEtapa/:etapaId", async (req, res) => {
  const etapaId = req.params.etapaId;

  try {
    await item.destroy({
      where: {
        fk_idEtapa: etapaId,
      },
    });

    await etapa.destroy({
      where: {
        idEtapa: etapaId,
      },
    });

    res.redirect("/visualizarEtapa");
  } catch (error) {
    res.send("Erro ao excluir etapa e seus itens relacionados: " + error);
  }
});

// Rota do tipo GET para a página de edição de etapa
app.get("/editarEtapa/:etapaId", async (req, res) => {
  const etapaId = req.params.etapaId;

  try {
    const etapaParaEditar = await etapa.findByPk(etapaId);

    if (!etapaParaEditar) {
      return res.status(404).send("Etapa não encontrada");
    }

    // Renderize a página de edição, passando a etapa a ser editada
    res.render("editarEtapa", { etapa: etapaParaEditar });
  } catch (error) {
    console.error("Erro ao obter dados do banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota do tipo POST para processar a edição de uma etapa
app.post("/editarEtapa/:etapaId", async (req, res) => {
  const etapaId = req.params.etapaId;

  // Verifique se dataFim está vazio
  const { dataFim } = req.body;
  const dataFimDB = dataFim ? dataFim : null;

  try {
    // Atualize a etapa no banco de dados com os novos dados
    await etapa.update(
      {
        nomeEtapa: req.body.nome,
        dataInicio: req.body.dataInicio,
        dataFim: dataFimDB,
        statusObra: req.body.status,
      },
      {
        where: {
          idEtapa: etapaId,
        },
      }
    );

    res.redirect("/visualizarEtapa");
  } catch (error) {
    console.error("Erro ao editar etapa no banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.post("/registrarPagamento/:idItem", (req, res) => {
  const itemId = req.params.idItem;

  // Lógica para atualizar o status de pagamento no banco de dados
  item
    .findByPk(itemId)
    .then((item) => {
      if (!item) {
        res.status(404).send("Item não encontrado");
      } else {
        item.pagamentoItem = true; // Define o pagamento como true
        item
          .save()
          .then(() => {
            res.redirect("/visualizarEtapa"); // Redireciona para a página de visualização de etapa após o registro do pagamento
          })
          .catch((error) => {
            res.status(500).send(`Erro ao registrar pagamento: ${error}`);
          });
      }
    })
    .catch((error) => {
      res.status(500).send(`Erro ao encontrar o item: ${error}`);
    });
});

app.post("/registrarPagamentosEtapa/:idEtapa", async (req, res) => {
  const etapaId = req.params.idEtapa;

  try {
    const itensDaEtapa = await item.findAll({
      where: { fk_idEtapa: etapaId, pagamentoItem: false }, // Seleciona os itens não pagos da etapa
    });

    if (itensDaEtapa.length === 0) {
      res.send("Todos os itens já estão pagos nesta etapa.");
      return;
    }

    // Atualiza o status de pagamento de todos os itens da etapa para pago
    await item.update(
      { pagamentoItem: true },
      { where: { fk_idEtapa: etapaId, pagamentoItem: false } }
    );

    res.redirect("/visualizarEtapa"); // Redireciona para a página de visualização de etapa após o registro dos pagamentos
  } catch (error) {
    res.status(500).send(`Erro ao registrar pagamentos da etapa: ${error}`);
  }
});

app.post("/registrarPagamentoTodosItens/:idEtapa", (req, res) => {
  const etapaId = req.params.idEtapa;

  // Lógica para atualizar o status de pagamento de todos os itens da etapa no banco de dados
  item
    .update({ pagamentoItem: true }, { where: { fk_idEtapa: etapaId } })
    .then(() => {
      res.redirect("/visualizarEtapa"); // Redireciona para a página de visualização de etapa após o registro do pagamento para todos os itens
    })
    .catch((error) => {
      res
        .status(500)
        .send(`Erro ao registrar pagamento para todos os itens: ${error}`);
    });
});

/*************************  CADASTRO DE ITEM **/

// Rota do tipo GET para a página de cadastro de item
app.get("/cadastroItem", async (req, res) => {
  const obraId = req.session.obraId;
  try {
    const etapas = await etapa.findAll({
      where: { fk_idObra: obraId },
    });
    res.render("cadastroItem", { etapas });
  } catch (erro) {
    console.error("Erro ao carregar o cadastro de item", erro);
    res.send("Erro ao carregar o cadastro de item");
  }
});

// Rota do tipo POST para criar um nova etapa
app.post("/itemCadastrado", (req, res) => {
  item
    .create({
      fk_idEtapa: req.body.etapa,
      descricaoItem: req.body.descricao,
      valorItem: req.body.valor,
      pagamentoItem: false,
    })
    .then(function () {
      res.redirect("/visualizarEtapa");
    })
    .catch(function (erro) {
      res.send("Erro ao cadastrar item!" + erro);
    });
});

// Rota do tipo GET para editar um item
app.get("/editarItem/:itemId", async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const itemParaEditar = await item.findByPk(itemId);

    if (!itemParaEditar) {
      return res.status(404).send("Item não encontrado");
    }

    // Renderize a página de edição, passando o item a ser editado
    res.render("editarItem", { item: itemParaEditar });
  } catch (error) {
    console.error("Erro ao obter dados do banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota do tipo POST para processar a edição de um item
app.post("/editarItem/:itemId", async (req, res) => {
  const itemId = req.params.itemId;

  try {
    // Atualize o item no banco de dados com os novos dados
    await item.update(
      {
        descricaoItem: req.body.descricao,
        valorItem: req.body.valor,
        pagamentoItem: req.body.pagamento,
      },
      {
        where: {
          idItem: itemId,
        },
      }
    );

    res.redirect("/visualizarEtapa");
  } catch (error) {
    console.error("Erro ao editar item no banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota do tipo POST para excluir um item
app.post("/excluirItem/:itemId", async (req, res) => {
  const itemId = req.params.itemId;

  try {
    // Exclua o item do banco de dados
    await item.destroy({
      where: {
        idItem: itemId,
      },
    });

    res.redirect("/visualizarEtapa");
  } catch (error) {
    console.error("Erro ao excluir item no banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

/*************************  ROTAS DO FORNECEDOR **/

// Rota do tipo GET para a página de cadastro de fornecedores
app.get("/cadastroFornecedor", (req, res) => {
  res.render("cadastroFornecedor");
});

// Rota do tipo POST para criar um novo fornecedor
app.post("/fornecedorCadastrado", (req, res) => {
  fornecedor
    .create({
      cnpj: req.body.cnpj,
      nomeFornecedor: req.body.nome,
      telefoneFornecedor: req.body.telefone,
      emailFornecedor: req.body.email,
      siteFornecedor: req.body.site,
    })
    .then(function () {
      //    res.render("fornecedorCadastrado");
      //    res.sendFile(path.join(__dirname, "/frontend/views/fornecedorCadastrado.html"));
      res.redirect("/listarFornecedores");
    })
    .catch(function (erro) {
      res.send("Erro ao cadastrar fornecedor!" + erro);
    });
});

// Rota do tipo GET para listar todos os fornecedores
app.get("/listarFornecedores", (req, res) => {
  fornecedor
    .findAll()
    .then((fornecedores) => {
      res.render("listarFornecedores", { fornecedores });
    })
    .catch((erro) => {
      res.send("Erro ao buscar fornecedores" + erro);
    });
});

// Rota do tipo DELETE para listar todos os fornecedores
app.delete("/fornecedor/:idFornecedor", async (req, res) => {
  const fornecedorId = req.params.idFornecedor;

  material
    .destroy({
      where: {
        fk_idFornecedor: fornecedorId,
      },
    })
    .then(() => {
      return fornecedor.destroy({
        where: {
          idFornecedor: fornecedorId,
        },
      });
    })
    .then(() => {
      res.redirect("/listarFornecedores");
    })
    .catch((error) => {
      res.send(
        "Erro ao excluir fornecedor e seus materiais relacionados: " + error
      );
    });
});

// Rota do tipo GET para mostrar o formulário de edição de material

app.get("/editarFornecedor/:id", (req, res) => {
  const fornecedorId = req.params.id;
  // Encontrar o material pelo ID no banco de dados
  fornecedor
    .findByPk(fornecedorId)
    .then((fornecedor) => {
      // Renderizar a página de edição com as informações do fornecedor
      res.render("editarFornecedor", { fornecedor, id: fornecedorId });
    })
    .catch((erro) => {
      res.send("Erro ao buscar fornecedor: " + erro);
    });
});
//Rota do tipo POST para editar informações dos fornecedores
app.post("/editarFornecedor/:id", (req, res) => {
  const fornecedorId = req.params.id;
  // Encontrar o fornecedor pelo ID no banco de dados
  fornecedor
    .findByPk(fornecedorId)
    .then((fornecedor) => {
      // Verificar se o fornecedor foi encontrado
      if (fornecedor) {
        // Atualizar as propriedades do material com os dados do formulário
        fornecedor.nomeFornecedor = req.body.nome;
        fornecedor.telefoneFornecedor = req.body.telefone;
        fornecedor.emailFornecedor = req.body.email;
        fornecedor.siteFornecedor = req.body.site;

        // Salvar as alterações no banco de dados
        return fornecedor.save();
      } else {
        // Fornecedor não encontrado, redirecionar para uma página de erro ou tratar de acordo com sua lógica
        res.send("Fornecedor não encontrado");
      }
    })
    .then(() => {
      // Redirecionar para a página de visualização do fornecedor após a edição
      res.redirect("/listarFornecedores");
    })
    .catch((erro) => {
      // Lidar com erros
      res.send("Erro ao editar fornecedor: " + erro);
    });
});

// Iniciar o servidor na porta 3007
app.listen(3008, () => {
  console.log("Servidor iniciado na porta 3008: http://localhost:3008");
});
