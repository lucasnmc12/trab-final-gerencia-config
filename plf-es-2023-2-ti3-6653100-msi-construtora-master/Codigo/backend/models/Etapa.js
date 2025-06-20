const Sequelize = require('sequelize')
const sequelize = require('../db');
const obra = require('./Obra');

const etapa = sequelize.define(
    "etapa",
    {
      idEtapa: {
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
      nomeEtapa: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dataInicio: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      dataFim: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      statusObra: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
      }
    },
    {
      tableName: 'etapa',
      timestamps: false,
    }
  );

etapa.belongsTo(obra, { foreignKey: 'fk_idObra' });

  module.exports = etapa;