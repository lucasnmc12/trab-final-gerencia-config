const Sequelize = require('sequelize');
const sequelize = require('../db');
const etapa = require('./Etapa');

const item = sequelize.define(
  'item',
  {
    idItem: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fk_idEtapa: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: etapa,
        key: 'idEtapa',
      },
      onDelete: 'CASCADE'
    },
    descricaoItem: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    valorItem: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    pagamentoItem: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
  },
  {
    tableName: 'item',
    timestamps: false,
  }
);

item.belongsTo(etapa, { foreignKey: 'fk_idEtapa'});

module.exports = item;
