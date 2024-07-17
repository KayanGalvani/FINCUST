// models/GastoCliente.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GastoCliente = sequelize.define('GastoCliente', {
  descricao: {
    type: DataTypes.STRING
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2)
  },
  data: {
    type: DataTypes.DATE
  },
  tipo: {
    type: DataTypes.ENUM('Despesa', 'Gasto', 'Lucro', 'Receita'),
    allowNull: false
  },
  observacao: {
    type: DataTypes.STRING
  },
  responsavel: {
    type: DataTypes.STRING
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = GastoCliente;
