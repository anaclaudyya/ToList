var btn = document.getElementById("btnEnviar");
btn.addEventListener("click", gravaDados, false);

var cont = 0 ;
var dados = [];
if  (localStorage.getItem("dados")){
    dados = JSON.parse(localStorage.getItem("dados") );   
}

CarregarTudo();

function gravaDados(){
   
   
    var atividade = new Object();
    atividade.nome = document.getElementById("nome").value;
    dados.push(atividade);
    document.getElementById("nome").value = "";
    CarregarTudo();
    localStorage.setItem("dados", JSON.stringify(dados));

}

function preencheTable(lista){
    var tabela = document.getElementById("minhaTabela");
    var tr = document.createElement("tr");   
    var tdNome = document.createElement("td"); 
    tdNome.id="gradeNome"+ cont; 
   

    var tdAcao = document.createElement("td");  
    var tdExcluir = document.createElement("td");  
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa fa-trash"); 
    var cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = false;
    
    tr.appendChild(tdNome);
    tr.appendChild(tdAcao);
    tr.appendChild(tdExcluir);
    tdNome.textContent = lista.nome;
    tdExcluir.appendChild(icon); 
    tdAcao.append(cb);
    cb.addEventListener("click",  function(event){
        var nome2 = event.currentTarget.myParam;
        var obj = document.getElementById(nome2);
        if (event.target.checked){
        obj.style.textDecoration = "line-through";
    }else{
        obj.style.textDecoration = "none";
    }

    },false);

    tdExcluir.addEventListener("click",  function(event){
        var nome3 = event.currentTarget;
        var entrou = 0;
       // alert(nome3.myParam);
        for (var i = 0; i < dados.length; i++) { 
           /* alert('-->'+dados[i].nome);
            alert(nome3.myParam);*/

            if (nome3.myParam == dados[i].nome) {
                var regExcluir = dados.indexOf(i);
                dados.splice(i, 1);
                entrou = 1;
                //alert(nome3.myParam);
                break;
            }
                       
        }
        localStorage.setItem("dados", JSON.stringify(dados));

        if (entrou==1){
            CarregarTudo();
        }

    },false);

    cb.myParam = tdNome.id;
    tdExcluir.myParam =lista.nome;

    tabela.appendChild(tr);
    cont++;
}
function CarregarTudo(){
    var tabela = document.getElementById("minhaTabela"); 
    tabela.innerHTML = "";
    for (var i = 0; i < dados.length; i++) { 
        var atividadeGravada = new Object();
        atividadeGravada.nome = dados[i].nome;
        document.getElementById("nome").value = "";
        preencheTable(atividadeGravada);
        
    }
}


