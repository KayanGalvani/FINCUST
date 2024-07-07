document.addEventListener('DOMContentLoaded', () => {
    fetchGastos();
  });
  
  function fetchGastos() {
    fetch('http://localhost:3000/api/gastos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar gastos.');
        }
        return response.json();
      })
      .then(data => {
        const tabelaGastos = document.getElementById('tabela-gastos');
        tabelaGastos.innerHTML = ''; // Limpar tabela antes de adicionar os novos dados
  
        data.forEach(gasto => {
          const tr = document.createElement('tr');
  
          // Determinar classe para cor do valor (lucro ou despesa)
          const valorClass = gasto.tipo === 'lucro' ? 'expense-value-positive' : 'expense-value-negative';
  
          // Determinar ícone para valores de despesa
          const iconHtml = gasto.tipo === 'despesa' ? '<i class="fas fa-arrow-down"></i>' : '';
  
          tr.innerHTML = `
            <td>${gasto.id}</td>
            <td>${gasto.titulo}</td>
            <td class="expense-value ${valorClass}">R$ ${gasto.valor.toFixed(2)} ${iconHtml}</td>
            <td>${new Date(gasto.data).toLocaleDateString()}</td>
            <td>
              <button class="btn-action" onclick="detalhesGasto(${gasto.id})">Detalhes</button>
            </td>
            <td>
              <button class="btn-action" onclick="editarGasto(${gasto.id})">Editar</button>
            </td>
          `;
          tabelaGastos.appendChild(tr);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar gastos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar gastos',
          text: 'Ocorreu um erro ao carregar os gastos. Por favor, tente novamente mais tarde.'
        });
      });
  }
  
  function detalhesGasto(id) {
    fetch(`http://localhost:3000/api/gastos/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar detalhes do gasto para edição.');
        }
        return response.json();
      })
      .then(data => {
        // Preencher o modal com os detalhes do gasto
        document.getElementById('edit-gasto-id').value = data.id;
        document.getElementById('edit-gasto-nome').value = data.titulo;
        document.getElementById('edit-gasto-valor').value = data.valor.toFixed(2);
        document.getElementById('edit-gasto-data').value = data.data.substring(0, 10); // Ajuste conforme necessário
        document.getElementById('edit-gasto-responsavel').value = data.responsavel; // Adicionar responsável
  
        // Abrir o modal de edição
        const modal = document.getElementById('editModal');
        modal.style.display = 'block';
      })
      .catch(error => {
        console.error('Erro ao carregar detalhes do gasto para edição:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar detalhes do gasto',
          text: 'Ocorreu um erro ao carregar os detalhes do gasto. Por favor, tente novamente mais tarde.'
        });
      });
  }
  
  function fecharModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
  }
  
  function salvarEdicao() {
    const id = document.getElementById('edit-gasto-id').value;
    const nome = document.getElementById('edit-gasto-nome').value;
    const valor = document.getElementById('edit-gasto-valor').value;
    const data = document.getElementById('edit-gasto-data').value;
    const responsavel = document.getElementById('edit-gasto-responsavel').value;
  
    const editedGasto = {
      id: id,
      titulo: nome,
      valor: parseFloat(valor),
      data: data,
      responsavel: responsavel
    };
  
    fetch(`http://localhost:3000/api/gastos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedGasto)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao salvar edição do gasto.');
      }
      return response.json();
    })
    .then(data => {
      Swal.fire(
        'Editado!',
        'O gasto foi editado com sucesso.',
        'success'
      );
      fecharModal();
      fetchGastos(); // Atualiza a lista após a edição
    })
    .catch(error => {
      console.error('Erro ao salvar edição do gasto:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao salvar edição do gasto',
        text: 'Ocorreu um erro ao salvar a edição do gasto. Por favor, tente novamente mais tarde.'
      });
    });
  }
  
  function editarGasto(id) {
    detalhesGasto(id); // Chama a função para carregar detalhes e abrir o modal de edição
  }
  
  function pesquisarGastos() {
    const nome = document.getElementById('searchInput').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
  
    // Lógica para pesquisar gastos com base nos filtros
    // Aqui você pode implementar a lógica de pesquisa conforme necessário
    console.log('Pesquisar gastos:', nome, startDate, endDate);
  }