// Arquivo cliente.js (ou o nome que preferir)
const clientId = 11; // ID do cliente que você deseja visualizar

fetch(`http://localhost:3000/api/clientes/${clientId}`)
    .then(response => response.json())
    .then(cliente => {
        // Aqui você pode usar o cliente recebido para atualizar a página
        const clienteDetails = document.getElementById('cliente-details'); // Elemento onde você deseja exibir os detalhes
        clienteDetails.innerHTML = `
            <h1>Detalhes do Cliente</h1>
            <ul>
                <li><strong>Nome:</strong> ${cliente.nome}</li>
                <li><strong>CPF:</strong> ${cliente.cpf}</li>
                <li><strong>Telefone:</strong> ${cliente.telefone}</li>
                <li><strong>Email:</strong> ${cliente.email}</li>
                <li><strong>CEP:</strong> ${cliente.cep}</li>
                <li><strong>Cidade:</strong> ${cliente.cidade}</li>
                <li><strong>UF:</strong> ${cliente.uf}</li>
                <li><strong>Bairro:</strong> ${cliente.bairro}</li>
                <li><strong>Endereço:</strong> ${cliente.endereco}</li>
                <li><strong>Observação:</strong> ${cliente.observacao}</li>
            </ul>
        `;
    })
    .catch(error => console.error('Erro ao buscar detalhes do cliente:', error));
