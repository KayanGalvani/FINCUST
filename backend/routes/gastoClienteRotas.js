// routes/gastoClienteRotas.js

const express = require('express');
const router = express.Router();
const GastoCliente = require('../models/GastoCliente');

// Rota para cadastrar um novo gasto/lucro
// Rota para criar um novo gasto/lucro
router.post('/cliente/:clienteId', async (req, res) => {
  try {
    const { clienteId } = req.params;
    const { descricao, valor, data, tipo, responsavel, observacao } = req.body;
    
    const novoGasto = await GastoCliente.create({
      descricao,
      valor,
      data,
      tipo,
      responsavel,
      observacao,
      clienteId // Certifique-se de que o ID do cliente está sendo salvo corretamente
    });
    
    res.status(201).json(novoGasto);
  } catch (error) {
    console.error('Erro ao criar novo gasto/lucro:', error); // Adicione logging para ajudar a depuração
    res.status(500).json({ error: 'Erro ao criar novo gasto/lucro' });
  }
});


// Rota para obter todos os gastos/lucros de um cliente específico
router.get('/cliente/:clienteId', async (req, res) => {
  try {
    const { clienteId } = req.params;
    const gastos = await GastoCliente.findAll({ where: { clienteId } });
    res.status(200).json(gastos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter todos os gastos/lucros sem especificar um cliente
router.get('/', async (req, res) => {
  try {
    const gastos = await GastoCliente.findAll();
    res.status(200).json(gastos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para obter um gasto/lucro específico pelo ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const gasto = await GastoCliente.findByPk(id);

    if (!gasto) {
      return res.status(404).json({ error: 'Gasto/lucro não encontrado.' });
    }

    res.status(200).json(gasto);
  } catch (error) {
    console.error('Erro ao buscar gasto/lucro:', error);
    res.status(500).json({ error: 'Erro ao buscar gasto/lucro.' });
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const gasto = await GastoCliente.findByPk(id);

    if (!gasto) {
      return res.status(404).json({ error: 'Gasto/Lucro não encontrado' });
    }

    await gasto.destroy();

    res.json({ message: 'Gasto/Lucro deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar gasto/lucro:', error);
    res.status(500).json({ error: 'Erro interno ao deletar gasto/lucro' });
  }
});

// Exemplo de rota PUT para atualizar um gasto/lucro
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Encontra o gasto/lucro pelo ID
    const gasto = await GastoCliente.findByPk(id);

    if (!gasto) {
      return res.status(404).json({ error: 'Gasto/Lucro não encontrado' });
    }

    // Atualiza os campos do gasto/lucro com os dados do corpo da requisição
    gasto.descricao = req.body.descricao;
    gasto.valor = req.body.valor;
    gasto.data = req.body.data;
    gasto.tipo = req.body.tipo;
    gasto.observacao = req.body.observacao;
    gasto.responsavel = req.body.responsavel;

    // Salva as alterações no banco de dados
    await gasto.save();

    // Retorna o gasto/lucro atualizado como resposta
    res.json(gasto);
  } catch (error) {
    console.error('Erro ao atualizar gasto/lucro:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar gasto/lucro' });
  }
});

  
// Outras rotas de GET, PUT, DELETE aqui...

module.exports = router;
