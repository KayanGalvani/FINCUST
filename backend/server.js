const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRotas = require('./routes/authRotas');
const usuarioRotas = require('./routes/usuarioRotas');
const gastoRotas = require('./routes/gastoRotas');
const clienteRotas = require('./routes/clienteRotas');
const path = require('path');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para tratar requisições JSON e URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para permitir CORS
app.use(cors());

// Middleware para servir arquivos estáticos (opcional, dependendo do seu projeto)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/api/auth', authRotas); // Rotas de autenticação
app.use('/api/usuarios', usuarioRotas); // Rotas de usuários
app.use('/api/gastos', gastoRotas); // Rotas de gastos
app.use('/api/clientes', clienteRotas); // Rotas de clientes

// Iniciar servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.error('Falha ao sincronizar o banco de dados:', err);
});
