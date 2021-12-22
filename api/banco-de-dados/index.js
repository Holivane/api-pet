const Sequelize = require('sequelize') // Criar conexão com banco de dados
const config = require('config') // Separar as configurações do projeto

const instancia = new Sequelize(
    config.get('mysql.banco-de-dados'),
    config.get('mysql.usuario'),
    config.get('mysql.senha'),
    {
        host: config.get('mysql.host'),
        dialect: 'mysql'
    }
)

module.exports = instancia