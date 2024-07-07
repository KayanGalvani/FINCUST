const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_fincust', 'postgres', 'postgress', {
    host: 'localhost',
    dialect: 'postgres' // Assumindo que você está usando PostgreSQL
});

// Testando a conexão
async function testarConexao() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
    }
}

// Exportando o objeto sequelize
module.exports = sequelize;
