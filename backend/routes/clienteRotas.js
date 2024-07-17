const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente'); // Verifique o caminho correto para o modelo Cliente

// Rota para criar um novo cliente
router.post('/', async (req, res) => {
  try {
    const novoCliente = await Cliente.create(req.body);
    res.status(201).json(novoCliente);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ error: 'Erro ao criar cliente.' });
  }
});

// Rota para buscar todos os clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes.' });
  }
});

// Rota para buscar um cliente pelo ID
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    res.status(500).json({ error: 'Erro ao buscar cliente.' });
  }
});

// Rota para atualizar um cliente pelo ID
router.put('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    await cliente.update(req.body);
    res.status(200).json(cliente);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ error: 'Erro ao atualizar cliente.' });
  }
});

// Rota para deletar um cliente pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    await cliente.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    res.status(500).json({ error: 'Erro ao deletar cliente.' });
  }
});

module.exports = router;
