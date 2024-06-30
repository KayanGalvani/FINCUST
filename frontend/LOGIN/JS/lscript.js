function login() {
    const email = document.getElementById('email').value;
    const password = document.querySelector('input[name="password"]').value;
    const errorMessageElement = document.getElementById('errorMessage');

    // Verifica se os campos estão preenchidos
    if (!email || !password) {
        errorMessageElement.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
        console.log('Sucesso ao autenticar:', response);

        // Redirecionar para o dashboard após o login
        window.location.href = "../DASHBOARD/dashboard.html";
    })
    .catch(error => {
        console.error('Erro ao autenticar:', error);

        // Mensagem de erro específica para usuário inválido
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
            errorMessageElement.textContent = 'E-mail ou senha inválidos.';
        } else {
            errorMessageElement.textContent = 'E-mail ou senha inválidos.';
        }
    });
}
