//Obra.js:
const Sequelize = require('sequelize')
const sequelize = require('../db');
const cliente = require('./Cliente');

const obra = sequelize.define(
  "obra",
  {
    idObra: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fk_idCliente: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: cliente, // Nome do modelo do cliente
          key: 'idCliente', // Nome do campo chave primária na tabela do cliente
        },
      },
    enderecoObra: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cidadeObra: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tamanhoTerrenoObra: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dataInicioObra: {
      type: Sequelize.DATE,
      allowNull: false, 
    },
    qtdComodosObra: {
      type: Sequelize.INTEGER,
      allowNull: false, 
    },
    garagemObra: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
      }
  },
  {
    tableName: 'obra',
    timestamps: false,
  }
);
// Defina a associação entre Material e Fornecedor
obra.belongsTo(cliente, { foreignKey: 'fk_idCliente' });

module.exports = obra;
