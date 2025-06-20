const Sequelize = require('sequelize');
const sequelize = require('../db');
const fornecedor = require('./Fornecedor'); // Importe o modelo do fornecedor

const material = sequelize.define(
  'material',
  {
    idMaterial: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nomeMaterial: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    precoMaterial: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    tipoMaterial: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fk_idFornecedor: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: fornecedor, // Nome do modelo do fornecedor
        key: 'idFornecedor', // Nome do campo chave primária na tabela do fornecedor
      },
      onDelete: 'CASCADE' // Configuração para exclusão em cascata
    },
    descricaoMaterial: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'material',
    timestamps: false,
  }
);

// Associação entre Material e Fornecedor
material.belongsTo(fornecedor, { foreignKey: 'fk_idFornecedor' });

module.exports = material;
