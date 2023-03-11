
function fetchProcessList() {
    fetch("https://localhost:7271/Process")
        .then(response => response.json())
        .then(processos => {
            console.log(processos)
            preencherTabela(processos);
        })
        .catch(error => console.log(error));
}
fetchProcessList();

function preencherTabela(processos){
    const tabela = document.querySelector("#tabela-tarefas");
    processos.forEach( processo => {

        const linhaTabela = document.createElement("tr");

        const celulaId = document.createElement("td");
        celulaId.textContent = processo.id;
        linhaTabela.appendChild(celulaId);

        const celulaNome = document.createElement("td");
        celulaNome.textContent = processo.nome;
        linhaTabela.appendChild(celulaNome);

        const celulaMemoria = document.createElement("td");
        celulaMemoria.textContent = processo.memória;
        linhaTabela.appendChild(celulaMemoria);

        tabela.appendChild(linhaTabela);
    })
}