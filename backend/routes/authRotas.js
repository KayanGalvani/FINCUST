const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Rota para login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        console.log('Tentativa de login para:', email);

        // Busca usuário pelo email
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            console.log('Usuário não encontrado para:', email);
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Compara a senha fornecida com a senha armazenada
        if (senha !== usuario.senha) {
            console.log('Credenciais inválidas para:', email);
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Login bem-sucedido
        console.log('Login bem-sucedido para:', email);
        res.status(200).json({ message: 'Login bem-sucedido' });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;
