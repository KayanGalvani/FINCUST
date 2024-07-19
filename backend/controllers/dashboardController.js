const { Gasto, GastoCliente } = require('../models'); // Certifique-se de que este caminho está correto

exports.getDashboardData = async (req, res) => {
  try {
    const gastos = await Gasto.findAll();
    const gastosClientes = await GastoCliente.findAll();

    const totalBruto = gastos.reduce((acc, gasto) => acc + parseFloat(gasto.valor), 0);
    const totalDespesas = gastos.filter(gasto => gasto.tipo === 'Despesa').reduce((acc, gasto) => acc + parseFloat(gasto.valor), 0);
    const totalLucros = gastos.filter(gasto => gasto.tipo === 'Lucro').reduce((acc, gasto) => acc + parseFloat(gasto.valor), 0);
    const lucroLiquido = totalLucros - totalDespesas;

    res.json({ totalBruto, totalDespesas, lucroLiquido });
  } catch (error) {
    console.error('Erro ao obter dados do dashboard:', error);
    res.status(500).json({ error: 'Erro ao obter dados do dashboard' });
  }
};
