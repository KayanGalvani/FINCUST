const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRotas = require('./routes/authRotas');
const usuarioRotas = require('./routes/usuarioRotas');
const gastoRotas = require('./routes/gastoRotas');
const clienteRotas = require('./routes/clienteRotas');
const gastoClienteRotas = require('./routes/gastoClienteRotas');
const path = require('path');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do mecanismo de modelo EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para tratar requisições JSON e URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para permitir CORS
app.use(cors());

// Middleware para sessões
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Middleware para servir arquivos estáticos (opcional)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de log para depuração
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rotas
app.use('/api/auth', authRotas);
app.use('/api/usuarios', usuarioRotas);
app.use('/api/gastos', gastoRotas);
app.use('/api/clientes', clienteRotas);
app.use('/api/gastoClientes', gastoClienteRotas);

// Iniciar servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => {
    console.error('Falha ao sincronizar o banco de dados:', err);
});
