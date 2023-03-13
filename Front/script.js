const tabela = document.querySelector("#tabela-tarefas");
const btnSortNomes = document.querySelector("#sortNomes");
const btnSortMemo = document.querySelector("#sortMemoria");
const tbodyEl = document.querySelector("#body-tabela")
let resultadoApi;
let resultadoSortedNome;
let sortedByname = false;
let sortedByMemo = false;

window.onload = ()=>{
    let criatbody = document.createElement("tbody");
}
   
function fetchProcessList() {
    fetch("https://localhost:7271/Process")
        .then(response => response.json())
        .then(processos => {
            //console.log(processos)
            resultadoApi = processos;
            
            if(sortedByname === false && sortedByMemo === false){
                preencherTabela();
            }else if(sortedByname === true){
                 resultadoApi.sort((a,b)=>{
                    if(a.nome < b.nome){
                        return -1;
                    }else{
                        return true
                    }
                })
                preencherTabela();
            }else if(sortedByMemo === true){
                resultadoApi.sort((a,b)=>{
                    if(a.memória > b.memória){
                        return true;
                    }else{
                        return -1
                    }
                })
                preencherTabela();
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

    tabela.appendChild(tbodyEl);
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
        tbodyEl.appendChild(linhaTabela);
        
    })
    
}

btnSortNomes.addEventListener("click", ()=>{
    if(sortedByname === false){
        sortedByname = true;    
        fetchProcessList();
    }else{
        sortedByname = false;
        fetchProcessList();
    }

})

btnSortMemo.addEventListener("click", ()=>{
    if(sortedByMemo === false){
        sortedByMemo = true;
        fetchProcessList();
    }else{
        sortedByMemo = false;
    }
    
})