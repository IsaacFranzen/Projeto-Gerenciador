const tabela = document.querySelector('#tabela-tarefas');
const btnSortNomes = document.querySelector('#sort-nomes');
const btnSortMemo = document.querySelector('#sort-memoria');
const tbodyEl = document.querySelector('#body-tabela');
const unidadeDeMemoria = 'Kb'
let resultadoApi;
let resultadoSortedNome;
let sortedByname = false;
let sortedByMemo = false;
window.onload = () => {
  document.createElement('tbody');
};
// faz o fetch com a api local que contém os processos atuais do computador
function fetchProcessList() {
  fetch('https://localhost:7271/Process')
    .then((response) => response.json())
    .then((processos) => {
      resultadoApi = processos;
      if (sortedByname === false && sortedByMemo === false) {
        preencherTabela();
      } else if (sortedByname === true) {
        resultadoApi.sort((a, b) => {
          if (a.nome < b.nome) {
            return -1;
          }
          return true;
        });
        preencherTabela();
      } else if (sortedByMemo === true) {
        resultadoApi.sort((a, b) => {
          if (a.memória > b.memória) {
            return true;
          }
          return -1;
        });
        preencherTabela();
      }
    })
    .catch((error) => console.log(error));
}

// setInterval definido para atualizar e fazer o fetch a cada 1 segundo matendo a tabela atualizada.
setInterval(() => {
  fetchProcessList();
}, 1000);

// Preenche a tabela com os dados retornados da api de processos locais
function preencherTabela() {
  const linhasTamanho = tabela.rows.length;
  for (let i = linhasTamanho - 1; i > 0; i--) {
    tabela.deleteRow(i);
  }
    tabela.appendChild(tbodyEl);
    resultadoApi.forEach((processo) => {
    const linhaTabela = document.createElement('tr');

    const celulaId = document.createElement('td');
    celulaId.textContent = processo.id;
    linhaTabela.appendChild(celulaId);

    const celulaNome = document.createElement('td');
    celulaNome.classList.add('nome-class');
    celulaNome.textContent = processo.nome;
    linhaTabela.appendChild(celulaNome);

    const celulaMemoria = document.createElement('td');
    celulaMemoria.textContent = `${processo.memoria}  ${unidadeDeMemoria}`;
    linhaTabela.appendChild(celulaMemoria);
    tbodyEl.appendChild(linhaTabela);
  });
}

// evento de click que ativa a função de ordenação por nome em ordem alfabética
btnSortNomes.addEventListener('click', () => {
  if (sortedByname === false) {
    sortedByname = true;
    fetchProcessList();
  } else {
    sortedByname = false;
    fetchProcessList();
  }
});

// evento de click que ativa a função de ordenação por uso de memória
btnSortMemo.addEventListener('click', () => {
  if (sortedByMemo === false) {
    sortedByMemo = true;
    fetchProcessList();
  } else {
    sortedByMemo = false;
  }
});
