const Sequelize = require('sequelize');
const sequelize = require('../db');
const obra = require('./Obra'); // Importe o modelo da obra

const servico = sequelize.define(
'servico',
  {
    idServico: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fk_idObra: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: obra, 
        key: 'idObra', 
      },
      onDelete: 'CASCADE' 
    },
    tipoServico: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descricaoServico: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    dataContratacao: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    valorServico: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: 'servico',
    timestamps: false,
  }
);

// Associação entre Material e Fornecedor
servico.belongsTo(obra, { foreignKey: 'fk_idObra' });

module.exports = servico;
