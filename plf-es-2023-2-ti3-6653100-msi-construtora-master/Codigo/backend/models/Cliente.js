//Cliente.js
const Sequelize = require('sequelize')
const sequelize = require('../db');

const cliente = sequelize.define(
    "cliente",
    {
      idCliente: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nomeCliente: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpfCliente: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidadeCliente: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estadoCliente: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      enderecoCliente: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefoneCliente: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emailCliente: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senhaCliente: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isAdmin:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: 'cliente',
      timestamps: false,
    }
  );
  
  module.exports = cliente;