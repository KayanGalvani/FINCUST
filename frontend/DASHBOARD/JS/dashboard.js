document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar dados de gastos e lucros
    function carregarDadosFinanceiros() {
        // Aqui você fará requisições fetch para obter os dados de gastos do backend
        fetch('http://localhost:3000/api/dashboard/stats')
            .then(response => response.json())
            .then(data => {
                const { totalBruto, totalDespesas, lucroLiquido } = data;

                document.getElementById('total-bruto').textContent = `R$ ${totalBruto.toFixed(2)}`;
                document.getElementById('total-despesas').textContent = `R$ ${totalDespesas.toFixed(2)}`;
                document.getElementById('lucro-liquido').textContent = `R$ ${lucroLiquido.toFixed(2)}`;
            })
            .catch(error => {
                console.error('Erro ao carregar dados financeiros:', error);
                alert('Erro ao carregar dados financeiros. Tente novamente mais tarde.');
            });
    }

    // Carregar dados financeiros ao carregar a página
    carregarDadosFinanceiros();

    // Evento para gerar relatório
    const btnGerarRelatorio = document.getElementById('btn-gerar-relatorio');
    if (btnGerarRelatorio) {
        btnGerarRelatorio.addEventListener('click', function(event) {
            event.preventDefault();
            const dataInicio = document.getElementById('data_inicio').value;
            const dataFim = document.getElementById('data_fim').value;
            // Aqui você pode enviar os dados de dataInicio e dataFim para gerar um relatório específico
            console.log('Data de Início:', dataInicio);
            console.log('Data de Fim:', dataFim);
            // Implemente a lógica para gerar o relatório com base nas datas selecionadas
        });
    }
});
