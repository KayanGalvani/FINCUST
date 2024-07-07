document.querySelector('.expense-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const titulo = document.getElementById('expense-title').value;
    const responsavel = document.getElementById('expense-responsible').value;
    const observacao = document.getElementById('expense-observation').value;
    const tipo = document.getElementById('expense-type').value;
    const valor = parseFloat(document.getElementById('expense-value').value);
    const data = document.getElementById('expense-date').value;

    try {
        const response = await fetch('http://localhost:3000/api/gastos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo,
                responsavel,
                observacao,
                tipo,
                valor,
                data
            }),
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar gasto.');
        }

        Swal.fire({
            title: 'Gasto Cadastrado!',
            text: 'O gasto foi cadastrado com sucesso.',
            icon: 'success',
            confirmButtonColor: '#28a745',
            confirmButtonText: 'OK'
        }).then(() => {
            // Redireciona para a página de listar gastos após o clique em OK
            window.location.href = '../listarGastos/listarGastos.html';
        });

        // Limpar o formulário após o cadastro
        document.querySelector('.expense-form').reset();
    } catch (error) {
        console.error('Erro ao cadastrar gasto:', error);
        Swal.fire({
            title: 'Erro',
            text: 'Ocorreu um erro ao cadastrar o gasto.',
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
        });
    }
});

// Função para atualizar a cor do valor baseado no tipo de gasto selecionado
document.getElementById('expense-type').addEventListener('change', function() {
    const valorInput = document.getElementById('expense-value');
    if (this.value === 'lucro') {
        valorInput.classList.remove('expense-value-negative');
        valorInput.classList.add('expense-value-positive');
    } else if (this.value === 'despesa') {
        valorInput.classList.remove('expense-value-positive');
        valorInput.classList.add('expense-value-negative');
    } else {
        valorInput.classList.remove('expense-value-positive', 'expense-value-negative');
    }
});
