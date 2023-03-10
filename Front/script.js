
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
    const divTeste = document.querySelector("#teste");
    for(let i = 0; i < processos.length; i++){
        let p = document.createElement("p");
        p.innerText = processos[i].nome;
        divTeste.appendChild(p)
    }   
}