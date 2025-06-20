const Sequelize = require('sequelize')
const sequelize = require('../db');

const custo = sequelize.define(
    "custo",
    {
      idCusto: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      custoMetro: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      custoComodo: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      custoGaragem: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
    },
    {
      tableName: 'custo',
      timestamps: true,
    }
  );

  module.exports = custo;