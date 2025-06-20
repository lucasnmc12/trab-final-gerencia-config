// configuração sequelize

const Sequelize  = require("sequelize")

const sequelize = new Sequelize('msi', 'root', 'root' ,{
    host:'localhost',
    dialect: 'mysql',
    timezone: '+03:00' // Fuso horário (GMT+3)
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados MySQL estabelecida com sucesso!');
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados MySQL!', err);
  });


module.exports = sequelize;