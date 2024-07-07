document.getElementById('user-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    const userId = document.getElementById('user-id').value; // Obtém o ID do usuário
    const formData = {
        nome: document.getElementById('user-name').value,
        cpf: document.getElementById('user-cpf').value,
        telefone: document.getElementById('user-phone').value,
        email: document.getElementById('user-email').value,
        senha: document.getElementById('user-password').value,
        novaSenha: document.getElementById('user-newpassword').value
    };

    try {
        const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            Swal.fire({
                title: 'Sucesso',
                text: 'Usuário atualizado com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = '../listarUsuarios/listarUsuarios.html'; // Redireciona após o clique em OK
            });
        } else {
            const errorData = await response.json();
            Swal.fire('Erro', errorData.error, 'error');
        }
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        Swal.fire('Erro', 'Erro ao atualizar usuário', 'error');
    }
});
