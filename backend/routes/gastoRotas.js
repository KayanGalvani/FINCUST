// routes/gastoRotas.js
const express = require('express');
const router = express.Router();
const Gasto = require('../models/Gasto');

// Rota para cadastrar um novo gasto
router.post('/', async (req, res) => {
    const { titulo, responsavel, observacao, tipo, valor, data } = req.body;

    try {
        const novoGasto = await Gasto.create({
            titulo,
            responsavel,
            observacao,
            tipo,
            valor,
            data
        });
        res.status(201).json(novoGasto);
    } catch (error) {
        console.error('Erro ao cadastrar gasto:', error);
        res.status(500).json({ error: 'Erro ao cadastrar gasto.' });
    }
});

// Rota para listar todos os gastos
router.get('/', async (req, res) => {
    try {
        const gastos = await Gasto.findAll();
        res.status(200).json(gastos);
    } catch (error) {
        console.error('Erro ao listar gastos:', error);
        res.status(500).json({ error: 'Erro ao listar gastos.' });
    }
});

// Rota para atualizar um gasto
router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        let gasto = await Gasto.findByPk(id);
        if (!gasto) {
            return res.status(404).json({ error: 'Gasto não encontrado.' });
        }

        // Atualizar os campos apenas se forem enviados na requisição
        if (req.body.titulo) gasto.titulo = req.body.titulo;
        if (req.body.responsavel) gasto.responsavel = req.body.responsavel;
        if (req.body.observacao) gasto.observacao = req.body.observacao;
        if (req.body.tipo) gasto.tipo = req.body.tipo;
        if (req.body.valor) gasto.valor = req.body.valor;
        if (req.body.data) gasto.data = req.body.data;

        // Salvar as alterações
        await gasto.save();

        res.status(200).json(gasto);
    } catch (error) {
        console.error('Erro ao atualizar gasto:', error);
        res.status(500).json({ error: 'Erro ao atualizar gasto.' });
    }
});

// Rota para excluir um gasto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const gasto = await Gasto.findByPk(id);
        if (!gasto) {
            return res.status(404).json({ error: 'Gasto não encontrado.' });
        }

        await gasto.destroy();
        res.status(200).json({ message: 'Gasto excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir gasto:', error);
        res.status(500).json({ error: 'Erro ao excluir gasto.' });
    }
});

// Rota para ver detalhes de um gasto
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const gasto = await Gasto.findByPk(id);
        if (!gasto) {
            return res.status(404).json({ error: 'Gasto não encontrado.' });
        }

        res.status(200).json(gasto);
    } catch (error) {
        console.error('Erro ao ver detalhes do gasto:', error);
        res.status(500).json({ error: 'Erro ao ver detalhes do gasto.' });
    }
});

module.exports = router;
