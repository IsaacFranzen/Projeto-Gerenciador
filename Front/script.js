const tabela = document.querySelector('#tabela-tarefas');
const btnSortNomes = document.querySelector('#sort-nomes');
const btnSortMemo = document.querySelector('#sort-memoria');
const btnSortId = document.querySelector('#sort-id');
const tbodyEl = document.querySelector('#body-tabela');
const unidadeDeMemoria = 'Kb';
let resultadoApi;
let resultadoSortedNome;
let sortedByname = false;
let sortedByMemo = false;
let sortedById = false;
window.onload = () => {
  document.createElement('tbody');
};
// faz o fetch com a api local que contém os processos atuais do computador
function fetchProcessList() {
  fetch('https://localhost:7271/Process')
    .then((response) => response.json())
    .then((processos) => {
      resultadoApi = processos;
      if (sortedByname === false && sortedByMemo === false && sortedById === false) {
        preencherTabela();
      } else if (sortedByname === true && sortedByMemo === false && sortedById === false) {
        resultadoApi.sort((a, b) => {
          if (a.nome < b.nome) {
            return -1;
          }
          return true;
        });
        preencherTabela();
      } else if (sortedByMemo === true && sortedByname === false && sortedById === false) {
        resultadoApi.sort((a, b) => {
          if (a.memória > b.memória) {
            return true;
          }
          return -1;
        });
        preencherTabela();
      }else if (sortedById === true && sortedByMemo === false && sortedByname === false) {
        resultadoApi.sort((a, b) => {
          return a.id - b.id;
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
    sortedByMemo = false;
    sortedById = false;
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
    sortedByname = false;
    sortedById = false;
    fetchProcessList();
  } else {
    sortedByMemo = false;
  }
});

btnSortId.addEventListener('click', () => {
  if (sortedById === false) {
    sortedById = true;
    sortedByname = false;
    sortedByMemo = false;
    fetchProcessList();
  } else {
    sortedById = false;
    fetchProcessList();
  }
});
