// Função para carregar os clientes cadastrados
function carregarClientes() {
  fetch('http://localhost:3000/api/clientes')
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector('#clientes-table tbody');
      tbody.innerHTML = ''; // Limpa o conteúdo atual da tabela

      data.forEach(cliente => {
        const row = `
          <tr>
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.cidade}</td>
            <td>${cliente.email}</td>
            <td>
              <button class="btn-action" onclick="exibirDetalhesCliente(${cliente.id})">Detalhes</button>
              <button class="btn-action" onclick="exibirModalEditCliente(${cliente.id})">Editar</button>
              <button class="btn-action" onclick="confirmarExclusaoCliente(${cliente.id})">Apagar</button>
            </td>
          </tr>
        `;
        tbody.innerHTML += row;
      });
    })
    .catch(error => {
      console.error('Erro ao carregar clientes:', error);
    });
}

// Função para exibir os detalhes do cliente
function exibirDetalhesCliente(clienteId) {
  window.location.href = `../detalhesClientes/detalhesClientes.html?id=${clienteId}`;
}

// Função para confirmar exclusão de cliente
function confirmarExclusaoCliente(clienteId) {
  Swal.fire({
    title: 'Tem certeza que deseja apagar?',
    text: 'Esta ação não pode ser revertida!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, apagar!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      // Requisição DELETE para apagar o cliente
      fetch(`http://localhost:3000/api/clientes/${clienteId}`, {
        method: 'DELETE'
      })
      .then(data => {
        Swal.fire(
          'Apagado!',
          'O cliente foi apagado com sucesso.',
          'success'
        );
        // Atualiza a tabela após exclusão
        carregarClientes();
      })
      .then(data => {
        Swal.fire(
          'Apagado!',
          'O cliente foi apagado com sucesso.',
          'success'
        );
        // Atualiza a tabela após exclusão
        carregarClientes();
      })
      .catch(error => {
        console.error('Erro ao apagar cliente:', error); // Loga o erro específico de exclusão
        Swal.fire(
          'Erro!',
          'Ocorreu um erro ao apagar o cliente.',
          'error'
        );
        // Atualiza a tabela mesmo em caso de erro para refletir a exclusão no frontend
        carregarClientes();
      });
    }
  });
}

// Função para exibir modal de edição de cliente
function exibirModalEditCliente(clienteId) {
  fetch(`http://localhost:3000/api/clientes/${clienteId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta do servidor.');
      }
      return response.json();
    })
    .then(cliente => {
      // Preenche os campos do formulário com os dados do cliente
      document.getElementById('edit-client-id').value = cliente.id;
      document.getElementById('edit-client-nome').value = cliente.nome;
      document.getElementById('edit-client-cpf').value = cliente.cpf;
      document.getElementById('edit-client-telefone').value = cliente.telefone;
      document.getElementById('edit-client-email').value = cliente.email;
      document.getElementById('edit-client-cep').value = cliente.cep;
      document.getElementById('edit-client-cidade').value = cliente.cidade;
      document.getElementById('edit-client-uf').value = cliente.uf;
      document.getElementById('edit-client-bairro').value = cliente.bairro;
      document.getElementById('edit-client-endereco').value = cliente.endereco;
      document.getElementById('edit-client-observacao').value = cliente.observacao;

      // Exibe a modal de edição
      document.getElementById('modal-edit-client').style.display = 'block';
    })
    .catch(error => {
      console.error('Erro ao buscar dados do cliente:', error);
      Swal.fire(
        'Erro!',
        'Ocorreu um erro ao buscar os dados do cliente.',
        'error'
      );
    });
}

// Função para fechar modal de edição de cliente
function fecharModalEditCliente() {
  document.getElementById('modal-edit-client').style.display = 'none';
}

// Função para salvar edição de cliente
function salvarEdicaoCliente() {
  const clienteId = document.getElementById('edit-client-id').value;
  const nome = document.getElementById('edit-client-nome').value;
  const cpf = document.getElementById('edit-client-cpf').value;
  const telefone = document.getElementById('edit-client-telefone').value;
  const email = document.getElementById('edit-client-email').value;
  const cep = document.getElementById('edit-client-cep').value;
  const cidade = document.getElementById('edit-client-cidade').value;
  const uf = document.getElementById('edit-client-uf').value;
  const bairro = document.getElementById('edit-client-bairro').value;
  const endereco = document.getElementById('edit-client-endereco').value;
  const observacao = document.getElementById('edit-client-observacao').value;

  const cliente = {
    nome,
    cpf,
    telefone,
    email,
    cep,
    cidade,
    uf,
    bairro,
    endereco,
    observacao
  };

  fetch(`http://localhost:3000/api/clientes/${clienteId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta do servidor.');
      }
      return response.json();
    })
    .then(data => {
      Swal.fire(
        'Sucesso!',
        'O cliente foi atualizado com sucesso.',
        'success'
      );
      // Fecha a modal de edição
      fecharModalEditCliente();
      // Atualiza a tabela de clientes
      carregarClientes();
    })
    .catch(error => {
      console.error('Erro ao salvar edição do cliente:', error);
      Swal.fire(
        'Erro!',
        'Ocorreu um erro ao salvar a edição do cliente.',
        'error'
      );
    });
}

// Carrega os clientes ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarClientes);
