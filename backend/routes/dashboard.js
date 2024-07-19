const express = require('express');
const router = express.Router();
const { Gasto, GastoCliente } = require('../models');

// Rota para obter as estatísticas financeiras
router.get('/stats', async (req, res) => {
    try {
        // Buscar todos os registros de Gasto
        const gastos = await Gasto.findAll();
        // Buscar todos os registros de GastoCliente
        const gastosClientes = await GastoCliente.findAll();

        // Calcular valores agregados
        const totalGastos = gastos.reduce((acc, gasto) => acc + parseFloat(gasto.valor), 0);
        const totalGastosClientes = gastosClientes.reduce((acc, gastoCliente) => acc + parseFloat(gastoCliente.valor), 0);

        const totalBruto = totalGastos + totalGastosClientes;
        const totalDespesas = totalGastos;
        const lucroLiquido = totalBruto - totalDespesas;

        // Retornar os valores agregados
        res.json({
            totalBruto,
            totalDespesas,
            lucroLiquido
        });
    } catch (error) {
        console.error('Erro ao buscar dados financeiros:', error);
        res.status(500).json({ error: 'Erro ao buscar dados financeiros.' });
    }
});

module.exports = router;
