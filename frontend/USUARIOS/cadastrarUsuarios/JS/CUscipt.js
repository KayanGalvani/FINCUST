
function showLoading() {
    Swal.fire({
        title: 'Carregando...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
            Swal.showLoading()
        }
    });
}

function hideLoading() {
    Swal.close();
}

function register(event) {
    event.preventDefault(); // Evita o envio do formulário padrão

    showLoading();

    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Registro bem-sucedido
            console.log('Sucesso', userCredential);
            hideLoading();
            Swal.fire('Sucesso', 'Usuário registrado com sucesso!', 'success');
        })
        .catch((error) => {
            // Tratamento de erros
            console.error('Erro ao registrar', error);
            hideLoading();
            Swal.fire('Erro', 'Erro ao registrar: ' + error.message, 'error');
        });
}