const tabela = document.querySelector("#tabela-tarefas");
const btnSortNomes = document.querySelector("#sortNomes");
let resultadoApi;
let resultadoSortedNome;
let sortedByname = false;

function fetchProcessList() {
    fetch("https://localhost:7271/Process")
        .then(response => response.json())
        .then(processos => {
            console.log(processos)
            resultadoApi = processos;
            
            if(sortedByname === false){
                preencherTabela();
            }else{
                resultadoSortedNome = resultadoApi.sort((a,b)=>{
                    if(a.nome < b.nome){
                        return -1;
                    }else{
                        return true
                    }
                })
                tabelaSorted();
            }
            
        })
        .catch(error => console.log(error));
}
setInterval(()=>{
    if(sortedByname === false){fetchProcessList();
        }else{
            sortedByname = true;
            fetchProcessList();
        };
},1000)


function preencherTabela(){
    let linhasTamanho = tabela.rows.length;
    for (var i = linhasTamanho - 1; i > 0; i--) {
    tabela.deleteRow(i);}

    const tbody = document.createElement("tbody");
    tabela.appendChild(tbody);
    resultadoApi.forEach( processo => {
        
        const linhaTabela = document.createElement("tr");

        const celulaId = document.createElement("td");
        celulaId.textContent = processo.id;
        linhaTabela.appendChild(celulaId);

        const celulaNome = document.createElement("td");
        celulaNome.classList.add("nome-class")
        celulaNome.textContent = processo.nome;
        linhaTabela.appendChild(celulaNome);

        const celulaMemoria = document.createElement("td");
        celulaMemoria.textContent = processo.memória;
        linhaTabela.appendChild(celulaMemoria);
        tbody.appendChild(linhaTabela);
        
    })
}

btnSortNomes.addEventListener("click", ()=>{
    sortedByname = true;
    fetchProcessList();
})

function tabelaSorted(){
    let linhasTamanho = tabela.rows.length;
    for (var i = linhasTamanho - 1; i > 0; i--) {
    tabela.deleteRow(i);}
    
    const tbody = document.createElement("tbody");
    tabela.appendChild(tbody);
    resultadoSortedNome.forEach( processo => {
        
        const linhaTabela = document.createElement("tr");

        const celulaId = document.createElement("td");
        celulaId.textContent = processo.id;
        linhaTabela.appendChild(celulaId);

        const celulaNome = document.createElement("td");
        celulaNome.classList.add("nome-class")
        celulaNome.textContent = processo.nome;
        linhaTabela.appendChild(celulaNome);

        const celulaMemoria = document.createElement("td");
        celulaMemoria.textContent = processo.memória;
        linhaTabela.appendChild(celulaMemoria);
        tbody.appendChild(linhaTabela);
        
})}