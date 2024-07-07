const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Rota para cadastrar um novo usuário
router.post('/cadastrar', async (req, res) => {
    const { nome, cpf, telefone, email, senha } = req.body;
    try {
        const novoUsuario = await Usuario.create({ nome, cpf, telefone, email, senha });
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para listar todos os usuários
router.get('/listar', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para apagar um usuário pelo ID
router.delete('/apagar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        await usuario.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Erro ao apagar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para buscar um usuário pelo ID
router.get('/buscar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para atualizar um usuário pelo ID
router.put('/atualizar/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, cpf, telefone, email, senha } = req.body;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        await usuario.update({ nome, cpf, telefone, email, senha });
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;
