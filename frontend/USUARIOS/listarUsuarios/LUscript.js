// LUscript.js

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/usuarios/listar', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const usuarios = await response.json();
            const tabela = document.getElementById('tabela-usuarios');

            usuarios.forEach(usuario => {
                const novaLinha = tabela.insertRow();
                novaLinha.id = `usuario-${usuario.id}`; // Adicionar um ID único para cada linha

                // Função para criptografar metade do CPF
                const cpfCriptografado = criptografarCPF(usuario.cpf);

                novaLinha.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nome}</td>
                    <td>${cpfCriptografado}</td>
                    <td>${usuario.telefone}</td>
                    <td>${usuario.email}</td>
                    <td><button class="btn-action" onclick="confirmarApagar(${usuario.id})">Apagar</button></td>
                `;
            });
        } else {
            console.error('Erro ao listar usuários:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
    }
});

function confirmarApagar(id) {
    Swal.fire({
        title: 'Tem certeza que deseja apagar?',
        text: 'Esta ação não pode ser revertida!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, apagar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            apagarUsuario(id);
        }
    });
}

async function apagarUsuario(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/apagar/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Erro ao apagar usuário');
        }

        // Atualizar a interface, remover o usuário da tabela
        document.getElementById(`usuario-${id}`).remove();

        // Exibir mensagem de sucesso
        Swal.fire(
            'Apagado!',
            'O usuário foi apagado com sucesso.',
            'success'
        ).then(() => {
            // Recarregar a página após a exclusão (opcional)
            // window.location.reload();
        });
    } catch (error) {
        console.error('Erro ao apagar usuário:', error);
        // Tratar o erro adequadamente, exibir mensagem de erro na UI, etc.
        Swal.fire(
            'Erro',
            'Ocorreu um erro ao apagar o usuário.',
            'error'
        );
    }
}

// Função para criptografar metade do CPF
function criptografarCPF(cpf) {
    return cpf.replace(/\d/g, '*');
}
