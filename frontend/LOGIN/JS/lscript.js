const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Limpar mensagem de erro
    errorMessage.textContent = '';

    // Verificar se todos os campos estão preenchidos
    if (!email || !senha) {
        errorMessage.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 404) {
                errorMessage.textContent = 'Credenciais inválidas. Verifique seu email e senha.';
            } else {
                throw new Error('Erro ao fazer login.');
            }
            return;
        }

        const data = await response.json();
        console.log('Login bem-sucedido:', data);

        // Redirecionar para a tela de dashboard
        window.location.href = '../DASHBOARD/dashboard.html'; // Ajuste conforme sua estrutura de arquivos

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        errorMessage.textContent = 'Erro ao fazer login. Tente novamente mais tarde.';
    }
});
