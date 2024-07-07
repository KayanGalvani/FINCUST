// models/Gasto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Gasto = sequelize.define('Gasto', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    responsavel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observacao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Gasto;
