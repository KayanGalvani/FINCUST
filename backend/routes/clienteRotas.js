const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Rota para cadastrar um novo cliente
router.post('/', async (req, res) => {
  try {
    const { nome, cpf, telefone, email, cep, cidade, uf, bairro, endereco, observacao } = req.body;
    const novoCliente = await Cliente.create({
      nome,
      cpf,
      telefone,
      email,
      cep,
      cidade,
      uf,
      bairro,
      endereco,
      observacao
    });
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para buscar todos os clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para mostrar os detalhes de um cliente
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.render('cliente', { cliente }); // Renderiza o template 'cliente.ejs' com os dados do cliente
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar um cliente pelo ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    
    // Atualiza todas as propriedades do cliente com base nos dados recebidos
    cliente.nome = req.body.nome;
    cliente.cpf = req.body.cpf;
    cliente.telefone = req.body.telefone;
    cliente.email = req.body.email;
    cliente.cep = req.body.cep;
    cliente.cidade = req.body.cidade;
    cliente.uf = req.body.uf;
    cliente.bairro = req.body.bairro;
    cliente.endereco = req.body.endereco;
    cliente.observacao = req.body.observacao;
    
    // Salva as alterações no banco de dados
    await cliente.save();

    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para apagar um cliente pelo ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    await cliente.destroy();
    res.status(200).json({ message: 'Cliente apagado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
