document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const clienteId = params.get('id');

  if (clienteId) {
    // Carregar detalhes do cliente
    fetch(`http://localhost:3000/api/clientes/${clienteId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Cliente não encontrado');
        }
        return response.json();
      })
      .then(cliente => {
        console.log('Detalhes do cliente:', cliente);
        document.getElementById('client-nome').textContent = cliente.nome || 'N/A';
        document.getElementById('client-cpf').textContent = cliente.cpf || 'N/A';
        document.getElementById('client-telefone').textContent = cliente.telefone || 'N/A';
        document.getElementById('client-email').textContent = cliente.email || 'N/A';
        document.getElementById('client-cep').textContent = cliente.cep || 'N/A';
        document.getElementById('client-cidade').textContent = cliente.cidade || 'N/A';
        document.getElementById('client-uf').textContent = cliente.uf || 'N/A';
        document.getElementById('client-bairro').textContent = cliente.bairro || 'N/A';
        document.getElementById('client-endereco').textContent = cliente.endereco || 'N/A';
        document.getElementById('client-observacao').textContent = cliente.observacao || 'N/A';

        // Carregar gastos/lucros do cliente
        fetch(`http://localhost:3000/api/gastoClientes/cliente/${clienteId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Gastos/lucros do cliente não encontrados');
            }
            return response.json();
          })
          .then(gastos => {
            console.log('Gastos/lucros do cliente:', gastos);
            const gastosTbody = document.getElementById('gastos-tbody');
            gastosTbody.innerHTML = ''; // Limpar tabela antes de preencher
            gastos.forEach(gasto => {
              const row = document.createElement('tr');
              row.innerHTML = `
                <td>${gasto.id}</td>
                <td>${gasto.descricao}</td>
                <td>${gasto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>${new Date(gasto.data).toLocaleDateString()}</td>
                <td>${gasto.tipo}</td>
                <td>
                  <button data-id="${gasto.id}" class="btn-edit">Editar</button>
                  <button data-id="${gasto.id}" class="btn-delete">Deletar</button>
                  <button data-id="${gasto.id}" class="btn-details">Detalhes</button>
                </td>
              `;
              gastosTbody.appendChild(row);
            });

            // Calcular e exibir balanço financeiro
            const totalGastos = gastos.reduce((acc, gasto) => {
              if (gasto.tipo === 'Gasto') {
                acc += parseFloat(gasto.valor);
              }
              return acc;
            }, 0);
            const totalLucros = gastos.reduce((acc, gasto) => {
              if (gasto.tipo === 'Lucro') {
                acc += parseFloat(gasto.valor);
              }
              return acc;
            }, 0);
            const balanceLiquido = totalLucros - totalGastos;

            // Selecionar o elemento de balanço líquido
            const balanceElement = document.getElementById('balance-liquido');
            balanceElement.textContent = balanceLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            // Definir a cor do texto baseado no valor do balanço
            if (balanceLiquido >= 0) {
              balanceElement.style.color = 'green'; // Balanço positivo, cor verde
            } else {
              balanceElement.style.color = 'red'; // Balanço negativo, cor vermelha
            }

            // Exibir total de gastos e lucros
            document.getElementById('total-gastos').textContent = totalGastos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            document.getElementById('total-lucros').textContent = totalLucros.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          })
          .catch(error => {
            console.error('Erro ao carregar gastos/lucros do cliente:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao carregar os gastos/lucros do cliente.', 'error');
          });
      })
      .catch(error => {
        console.error('Erro ao carregar detalhes do cliente:', error);
        Swal.fire('Erro!', 'Ocorreu um erro ao carregar os detalhes do cliente.', 'error');
      });
  } else {
    console.error('ID do cliente não encontrado na URL');
    Swal.fire('Erro!', 'ID do cliente não encontrado na URL.', 'error');
  }

  // Evento para adicionar novo gasto/lucro
  const btnCadastrar = document.getElementById('btnCadastrar');
  if (btnCadastrar) {
    btnCadastrar.addEventListener('click', function() {
      Swal.fire({
        title: 'Adicionar Novo Gasto/Lucro',
        html:
          `<form id="add-gasto-form">
            <div class="form-group">
              <label for="descricao">Descrição:</label>
              <input type="text" id="descricao" name="descricao" required>
            </div>
            <div class="form-group">
              <label for="valor">Valor:</label>
              <input type="number" id="valor" name="valor" required>
            </div>
            <div class="form-group">
              <label for="data">Data:</label>
              <input type="date" id="data" name="data" required>
            </div>
            <div class="form-group">
              <label for="tipo">Tipo:</label>
              <select id="tipo" name="tipo" required>
                <option value="Gasto">Gasto</option>
                <option value="Lucro">Lucro</option>
              </select>
            </div>
            <div class="form-group">
              <label for="responsavel">Responsável:</label>
              <input type="text" id="responsavel" name="responsavel">
            </div>
            <div class="form-group">
              <label for="observacao">Observação:</label>
              <textarea id="observacao" name="observacao"></textarea>
            </div>
          </form>`,
        showCancelButton: true,
        confirmButtonText: 'Salvar',
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        preConfirm: () => {
          const descricao = document.getElementById('descricao').value;
          const valor = document.getElementById('valor').value;
          const data = document.getElementById('data').value;
          const tipo = document.getElementById('tipo').value;
          const responsavel = document.getElementById('responsavel').value;
          const observacao = document.getElementById('observacao').value;
          return fetch(`http://localhost:3000/api/gastoClientes/cliente/${clienteId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descricao, valor, data, tipo, responsavel, observacao })
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Falha ao adicionar o gasto/lucro');
              }
              return response.json();
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Erro ao adicionar o gasto/lucro: ${error}`
              );
            });
        }
      })
        .then(result => {
          if (result.value) {
            Swal.fire('Sucesso!', 'Gasto/lucro adicionado com sucesso.', 'success');
            // Atualizar lista de gastos/lucros
          fetch(`http://localhost:3000/api/gastoClientes/cliente/${clienteId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Gastos/lucros do cliente não encontrados');
    }
    return response.json();
  })
  .then(gastos => {
    console.log('Gastos/lucros:', gastos);
    const gastosTbody = document.getElementById('gastos-tbody');
    gastosTbody.innerHTML = ''; // Limpar tabela
    gastos.forEach(gasto => {
      const row = document.createElement('tr');

      // Determinar a classe para cor do valor (gasto ou lucro)
      const valorClass = gasto.tipo === 'Gasto' ? 'gasto-valor' : 'lucro-valor';

      row.innerHTML = `
        <td>${gasto.id}</td>
        <td>${gasto.descricao}</td>
        <td class="${valorClass}">${parseFloat(gasto.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        <td>${new Date(gasto.data).toLocaleDateString()}</td>
        <td>${gasto.tipo}</td>
        <td>
          <button data-id="${gasto.id}" class="btn-edit">Editar</button>
          <button data-id="${gasto.id}" class="btn-delete">Deletar</button>
          <button data-id="${gasto.id}" class="btn-details">Detalhes</button>
        </td>
      `;
      gastosTbody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Erro ao carregar gastos/lucros do cliente:', error);
    Swal.fire('Erro!', 'Ocorreu um erro ao carregar os gastos/lucros do cliente.', 'error');
  });


          }
        });
    });
  }

  // Evento para editar gasto/lucro
  const gastosTbody = document.getElementById('gastos-tbody');
  if (gastosTbody) {
    gastosTbody.addEventListener('click', function(event) {
      if (event.target.classList.contains('btn-edit')) {
        const gastoId = event.target.getAttribute('data-id');
        fetch(`http://localhost:3000/api/gastoClientes/${gastoId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Gasto/lucro não encontrado');
            }
            return response.json();
          })
          .then(gasto => {
            Swal.fire({
              title: 'Editar Gasto/Lucro',
              html:
                `<form id="edit-gasto-form">
                  <div class="form-group">
                    <label for="descricao">Descrição:</label>
                    <input type="text" id="descricao" name="descricao" value="${gasto.descricao}" required>
                  </div>
                  <div class="form-group">
                    <label for="valor">Valor:</label>
                    <input type="number" id="valor" name="valor" value="${gasto.valor}" required>
                  </div>
                  <div class="form-group">
                    <label for="data">Data:</label>
                    <input type="date" id="data" name="data" value="${gasto.data.split('T')[0]}" required>
                  </div>
                  <div class="form-group">
                    <label for="tipo">Tipo:</label>
                    <select id="tipo" name="tipo" required>
                      <option value="Gasto" ${gasto.tipo === 'Gasto' ? 'selected' : ''}>Gasto</option>
                      <option value="Lucro" ${gasto.tipo === 'Lucro' ? 'selected' : ''}>Lucro</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="responsavel">Responsável:</label>
                    <input type="text" id="responsavel" name="responsavel" value="${gasto.responsavel}">
                  </div>
                  <div class="form-group">
                    <label for="observacao">Observação:</label>
                    <textarea id="observacao" name="observacao">${gasto.observacao}</textarea>
                  </div>
                </form>`,
              showCancelButton: true,
              confirmButtonText: 'Salvar',
              cancelButtonText: 'Cancelar',
              focusConfirm: false,
              preConfirm: () => {
                const descricao = document.getElementById('descricao').value;
                const valor = document.getElementById('valor').value;
                const data = document.getElementById('data').value;
                const tipo = document.getElementById('tipo').value;
                const responsavel = document.getElementById('responsavel').value;
                const observacao = document.getElementById('observacao').value;
                return fetch(`http://localhost:3000/api/gastoClientes/${gastoId}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ descricao, valor, data, tipo, responsavel, observacao })
                })
                  .then(response => {
                    if (!response.ok) {
                      throw new Error('Falha ao editar o gasto/lucro');
                    }
                    return response.json();
                  })
                  .catch(error => {
                    Swal.showValidationMessage(
                      `Erro ao editar o gasto/lucro: ${error}`
                    );
                  });
              }
            })
              .then(result => {
                if (result.value) {
                  Swal.fire('Sucesso!', 'Gasto/lucro editado com sucesso.', 'success');
                  // Atualizar lista de gastos/lucros
                  fetch(`http://localhost:3000/api/gastoClientes/cliente/${clienteId}`)
                    .then(response => {
                      if (!response.ok) {
                        throw new Error('Gastos/lucros do cliente não encontrados');
                      }
                      return response.json();
                    })
                    .then(gastos => {
                      console.log('Gastos/lucros atualizados:', gastos);
                      gastosTbody.innerHTML = ''; // Limpar tabela
                      gastos.forEach(gasto => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                          <td>${gasto.id}</td>
                          <td>${gasto.descricao}</td>
                          <td>${gasto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                          <td>${new Date(gasto.data).toLocaleDateString()}</td>
                          <td>${gasto.tipo}</td>
                          <td>
                            <button data-id="${gasto.id}" class="btn-edit">Editar</button>
                            <button data-id="${gasto.id}" class="btn-delete">Deletar</button>
                            <button data-id="${gasto.id}" class="btn-details">Detalhes</button>
                          </td>
                        `;
                        gastosTbody.appendChild(row);
                      });
                    })
                    .catch(error => {
                      console.error('Erro ao carregar gastos/lucros do cliente:', error);
                      Swal.fire('Erro!', 'Ocorreu um erro ao carregar os gastos/lucros do cliente.', 'error');
                    });
                }
              });
          })
          .catch(error => {
            console.error('Erro ao carregar detalhes do gasto/lucro:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao carregar os detalhes do gasto/lucro.', 'error');
          });
      } else if (event.target.classList.contains('btn-delete')) {
        const gastoId = event.target.getAttribute('data-id');
        Swal.fire({
          title: 'Você tem certeza?',
          text: 'Esta ação não pode ser desfeita!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, deletar!',
          cancelButtonText: 'Cancelar'
        }).then(result => {
          if (result.isConfirmed) {
            fetch(`http://localhost:3000/api/gastoClientes/${gastoId}`, {
              method: 'DELETE'
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('Falha ao deletar o gasto/lucro');
                }
                return response.json();
              })
              .then(() => {
                Swal.fire('Deletado!', 'O gasto/lucro foi deletado com sucesso.', 'success');
                // Atualizar lista de gastos/lucros
                fetch(`http://localhost:3000/api/gastoClientes/cliente/${clienteId}`)
                  .then(response => {
                    if (!response.ok) {
                      throw new Error('Gastos/lucros do cliente não encontrados');
                    }
                    return response.json();
                  })
                  .then(gastos => {
                    console.log('Gastos/lucros atualizados:', gastos);
                    gastosTbody.innerHTML = ''; // Limpar tabela
                    gastos.forEach(gasto => {
                      const row = document.createElement('tr');
                      row.innerHTML = `
                        <td>${gasto.id}</td>
                        <td>${gasto.descricao}</td>
                        <td>${gasto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        <td>${new Date(gasto.data).toLocaleDateString()}</td>
                        <td>${gasto.tipo}</td>
                        <td>
                          <button data-id="${gasto.id}" class="btn-edit">Editar</button>
                          <button data-id="${gasto.id}" class="btn-delete">Deletar</button>
                          <button data-id="${gasto.id}" class="btn-details">Detalhes</button>
                        </td>
                      `;
                      gastosTbody.appendChild(row);
                    });
                  })
                  .catch(error => {
                    console.error('Erro ao carregar gastos/lucros do cliente:', error);
                    Swal.fire('Erro!', 'Ocorreu um erro ao carregar os gastos/lucros do cliente.', 'error');
                  });
              })
              .catch(error => {
                console.error('Erro ao deletar gasto/lucro:', error);
                Swal.fire('Erro!', 'Ocorreu um erro ao deletar o gasto/lucro.', 'error');
              });
          }
        });
      } else if (event.target.classList.contains('btn-details')) {
        const gastoId = event.target.getAttribute('data-id');
        fetch(`http://localhost:3000/api/gastoClientes/${gastoId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Gasto/lucro não encontrado');
            }
            return response.json();
          })
          .then(gasto => {
            Swal.fire({
              title: 'Detalhes do Gasto/Lucro',
              html: `
                <ul>
                  <li><strong>ID:</strong> ${gasto.id}</li>
                  <li><strong>Descrição:</strong> ${gasto.descricao}</li>
                  <li><strong>Valor:</strong> ${gasto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</li>
                  <li><strong>Data:</strong> ${new Date(gasto.data).toLocaleDateString()}</li>
                  <li><strong>Tipo:</strong> ${gasto.tipo}</li>
                  <li><strong>Responsável:</strong> ${gasto.responsavel}</li>
                  <li><strong>Observação:</strong> ${gasto.observacao}</li>
                </ul>`
            });
          })
          .catch(error => {
            console.error('Erro ao carregar detalhes do gasto/lucro:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao carregar os detalhes do gasto/lucro.', 'error');
          });
      }
    });
  }
});
