const Sequelize = require('sequelize')
const sequelize = require('../db');

const fornecedor = sequelize.define(
  "fornecedor",
  {
    idFornecedor: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    cnpj: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nomeFornecedor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telefoneFornecedor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    emailFornecedor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    siteFornecedor: {
      type: Sequelize.STRING,
      allowNull: true, 
    },
  },
  {
    tableName: 'fornecedor',
    timestamps: false,
  }
);

module.exports = fornecedor;
