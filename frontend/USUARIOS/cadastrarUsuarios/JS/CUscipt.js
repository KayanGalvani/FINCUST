document.getElementById('user-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    const formData = {
        nome: document.getElementById('user-name').value,
        cpf: document.getElementById('user-cpf').value,
        telefone: document.getElementById('user-phone').value,
        email: document.getElementById('user-email').value,
        senha: document.getElementById('user-password').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/usuarios/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            Swal.fire({
                title: 'Sucesso',
                text: 'Usuário cadastrado com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // Redireciona para a página de lista após o clique em OK
                window.location.href = '../listarUsuarios/listarUsuarios.html';
            });

            // Limpar o formulário após o sucesso, se necessário
            document.getElementById('user-form').reset();
        } else {
            const errorData = await response.json();
            Swal.fire('Erro', errorData.error, 'error');
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        Swal.fire('Erro', 'Erro ao cadastrar usuário', 'error');
    }
});
