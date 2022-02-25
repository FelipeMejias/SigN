const signos=['Capricórnio','Aquário','Peixes','Áries','Touro','Gêmeos','Câncer','Leão','Virgem','Libra','Escorpião','Sagitário']
const planetas=['Sol','Ascendente','Lua']
const frases=['Como é a personalidade do ser:','Como o ser se apresenta ao mundo:','Como o ser expressa seus sentimentos:']
const usuarios=[]
let usuarioProprio=null;
let l1=null;
let l2=null;
let l3=null;

function navegar(nivel){
    if(nivel==3){paginaPlanetas.classList.add('some');paginaSignos.classList.remove('some')}
    if(nivel==2){paginaSignos.classList.add('some');paginaUsuarios.classList.remove('some')}
    
    
}

const paginaCadastro=document.querySelector('.paginaCadastro')
const paginaUsuarios=document.querySelector('.paginaUsuarios')
const paginaSignos=document.querySelector('.paginaSignos')
const paginaPlanetas=document.querySelector('.paginaPlanetas')
jaSouAlguem()

function jaSouAlguem(){
    quemSou()
    if(usuarioProprio!=null){
        carregarUsuarios()
        paginaUsuarios.classList.remove('some')

    }else{
        printarOpcoes()
    }
}

function quemSou(){
    jsonUsuario = window.localStorage.getItem('usuario');
    const usuario = JSON.parse(jsonUsuario)
    usuarioProprio=usuario
}

function printarOpcoes(){
    paginaCadastro.classList.remove('some')
    for(let j=0;j<planetas.length;j++){
    paginaCadastro.innerHTML+=`
    <div class="labelSelect">
                <label><h2>${planetas[j]}:</h2></label>
                <select class="${planetas[j]} decoracaoCadastro">
                    <option value="Não Sei" selected>Não sei</option>
                </select>
                </div>
    `
    }
    paginaCadastro.innerHTML+=`<button onclick="salvarUsuario()" class="decoracaoCadastro"><ion-icon name="checkmark-outline"></ion-icon></button>`
    const inputsOpcao=document.querySelectorAll('select')
    inputsOpcao.forEach(
        (select)=>{
            for(let k=0;k<12;k++){
                select.innerHTML+=`
                <option value="${signos[k]}">${signos[k]}</option>
                `
            }
        }
    )
}

function salvarUsuario(){
    const sol =document.querySelector('.Sol')
    const asc =document.querySelector('.Ascendente')
    const lua =document.querySelector('.Lua')
    const usuario={
        nome: document.querySelector('.paginaCadastro input').value,
        sol: sol.options[sol.selectedIndex].value,
        ascendente: asc.options[asc.selectedIndex].value,
        lua: lua.options[lua.selectedIndex].value
    }
    const promessa=axios.post('https://62102e943fd066f7b2307f7d.mockapi.io/users',usuario)
    promessa.then(()=>{console.log('uhuuu');
        paginaCadastro.classList.add('some')
        paginaUsuarios.classList.remove('some')
        const jsonAux = JSON.stringify(usuario)
        window.localStorage.setItem('usuario', jsonAux)
        carregarUsuarios()
        })
}

function carregarUsuarios(){
    const promessa=axios.get('https://62102e943fd066f7b2307f7d.mockapi.io/users')
    promessa.then((resposta)=>{
        resposta.data.forEach((usuario)=>{usuarios.push(usuario)})
        printarUsuarios()
    })
}

function printarUsuarios(){
    usuarios.forEach((usuario)=>{
        document.querySelector('.usuarios').innerHTML+=`
            <li onclick="buscarUsuario(${usuario.id})">
                <ion-icon name="person-circle-outline"></ion-icon>
                <h2>${usuario.nome}</h2>
            </li>
        `
    })
}

function buscarUsuario(id){
    usuarios.forEach((usuario)=>{
        if(usuario.id==id){
            printarPlanetasUsuario(usuario)
        }
    })
}

function printarPlanetasUsuario(objeto){
    paginaUsuarios.classList.add('some')
    paginaSignos.classList.remove('some')
    const elementoSol=qualElemento(objeto.sol)
    const elementoAscendente=qualElemento(objeto.ascendente)
    const elementoLua=qualElemento(objeto.lua)
    for(let k=0;k<signos.length;k++){
        if(objeto.sol==signos[k]){
        paginaSignos.innerHTML=`
        <button class="voltar" onclick="navegar(2)"><ion-icon name="arrow-back-outline"></ion-icon></button>
            <div onclick="abrirPlaneta('Sol','${objeto.sol}',0)" class="planeta">
                <img src=${elementoSol}>
                <h1>Sol: ${signos[k]}</h1>
            </div>
            `
        }
    }
    for(let k=0;k<signos.length;k++){
        if(objeto.ascendente==signos[k]){
        paginaSignos.innerHTML+=`
            <div onclick="abrirPlaneta('Ascendente','${objeto.ascendente}',1)" class="planeta">
                <img src=${elementoAscendente}>
                <h1>Ascendente: ${signos[k]}</h1>
            </div>
            `
        }
    }
    for(let k=0;k<signos.length;k++){
        if(objeto.lua==signos[k]){
        paginaSignos.innerHTML+=`
            <div onclick="abrirPlaneta('Lua','${objeto.lua}',2)"class="planeta">
                <img src=${elementoLua}>
                <h1>Lua: ${signos[k]}</h1>
            </div>
            `
        }
    }
}

function qualElemento(signo){
    if(signo==signos[0] || signo==signos[4] ||signo==signos[8]){return "terra.png"}
    if(signo==signos[1] || signo==signos[5] ||signo==signos[9]){return "ar.png"}
    if(signo==signos[2] || signo==signos[6] ||signo==signos[10]){return "agua.png"}
    if(signo==signos[3] || signo==signos[7] ||signo==signos[11]){return "fogo.png"}
}

function abrirPlaneta(planeta,signo,i){
    paginaSignos.classList.add('some')
    paginaPlanetas.classList.remove('some')
    const elemento=qualElemento(signo)
    paginaPlanetas.innerHTML=`
    <button class="voltar" onclick="navegar(3)"><ion-icon name="arrow-back-outline"></ion-icon></button>
        <section>
            <h1>${planeta}</h1>
            <h2>em</h2>
            <h1>${signo}</h1>
            <img src=${elemento}>
            </section>
            
        <section>
            <p class="frase">${frases[i]}</p>
            <ul class="lista${planeta}">
                <l1></l1>
                <div class="botoesConcorda b1 naoClica">
                    <button onclick="darLike('${planeta}',1)" class="like"><ion-icon name="thumbs-up-outline"></ion-icon></button>
                    <button onclick="darDislike('${planeta}',1)" class="dislike"><ion-icon name="thumbs-down-outline"></ion-icon></button>
                </div>
                <l2></l2>
                <div class="botoesConcorda b2 naoClica">
                    <button onclick="darLike('${planeta}',2)" class="like"><ion-icon name="thumbs-up-outline"></ion-icon></button>
                    <button onclick="darDislike('${planeta}',2)" class="dislike"><ion-icon name="thumbs-down-outline"></ion-icon></button>
                </div>
                <l3></l3>
                <div class="botoesConcorda b3 naoClica">
                    <button onclick="darLike('${planeta}',3)" class="like"><ion-icon name="thumbs-up-outline"></ion-icon></button>
                    <button onclick="darDislike('${planeta}',3)" class="dislike"><ion-icon name="thumbs-down-outline"></ion-icon></button>
                </div>
            </ul>
            <div class="contribua">
                <input class="input${planeta}" type="text" placeHolder="Contribua :)"></input>
                <button onclick="enviar('${planeta}','${signo}')"><ion-icon name="paper-plane-outline"></ion-icon></button>
            </div>
        </section>
    `
    carregarEnvios(planeta,signo)
}

function habilitarLikes(botao){
    if(botao=='b1'){if(document.querySelector('.b1').classList.contains('naoClica')){document.querySelector('.b1').classList.remove('naoClica')}}
    if(botao=='b2'){if(document.querySelector('.b2').classList.contains('naoClica')){document.querySelector('.b2').classList.remove('naoClica')}}
    if(botao=='b3'){if(document.querySelector('.b3').classList.contains('naoClica')){document.querySelector('.b3').classList.remove('naoClica')}}
    else{document.querySelectorAll('.botoesConcorda').forEach((botao)=>{if(botao.classList.contains('naoclica')){botao.classList.remove('naoClica')}})}
}

function desabilitarLikes(botao){
    if(botao=='b1'){if(!document.querySelector('.b1').classList.contains('naoClica')){document.querySelector('.b1').classList.add('naoClica')}}
    if(botao=='b2'){if(!document.querySelector('.b2').classList.contains('naoClica')){document.querySelector('.b2').classList.add('naoClica')}}
    if(botao=='b3'){if(!document.querySelector('.b3').classList.contains('naoClica')){document.querySelector('.b3').classList.add('naoClica')}}
    else{document.querySelectorAll('.botoesConcorda').forEach((botao)=>{if(!botao.classList.contains('naoclica')){botao.classList.add('naoClica')}})}
}

function enviar(planeta,signo){
    let valor=document.querySelector(`.input${planeta}`).value
    if(valor!=''){
    desabilitarLikes('todos')
    const objeto={
        signo:signo,
        texto:valor,
        likes:1,
        votos:1
    }
    document.querySelector(`.input${planeta}`).value=''
    const promessa=axios.post(`https://62102e943fd066f7b2307f7d.mockapi.io/${planeta}`,objeto)
    promessa.then(()=>{carregarEnvios(planeta,signo)})
}
}

function carregarEnvios(planeta,signo){
    const promessa=axios.get(`https://62102e943fd066f7b2307f7d.mockapi.io/${planeta}`)
    const listaEsp=[]
    promessa.then((resposta)=>{
        const lista=resposta.data
        lista.forEach((objeto)=>{if(objeto.signo==signo){listaEsp.push(objeto)}})
        maisVotado=0
        for(let k=0;k<listaEsp.length;k++){if(listaEsp[k].votos>maisVotado){maisVotado=listaEsp[k].votos}}
        let maiorPorcentagem=0
        let texto=null
        for(let k=0;k<listaEsp.length;k++){
            const porcentagem=Math.round(listaEsp[k].likes*100/listaEsp[k].votos)
            if(porcentagem>maiorPorcentagem && listaEsp[k].votos>maisVotado/3){
                maiorPorcentagem=porcentagem;
                texto=listaEsp[k].texto;
                l1=listaEsp[k];
                }
        }
        if(texto !== null){
            document.querySelector(`.lista${planeta} l1`).innerHTML= `<p>${texto} <small>${maiorPorcentagem}%</small></p>`;
            habilitarLikes('b1')
        }
        let segundaMaior=0
        let texto2=null
        for(let k=0;k<listaEsp.length;k++){
            const porcentagem=Math.round(listaEsp[k].likes*100/listaEsp[k].votos)
            if(porcentagem>segundaMaior && listaEsp[k].texto!=texto && listaEsp[k].votos>maisVotado/10){
                segundaMaior=porcentagem;
                texto2=listaEsp[k].texto;
                l2=listaEsp[k];
            }
        }
        if(texto2!=null){
            document.querySelector(`.lista${planeta} l2`).innerHTML=`<p>${texto2} <small>${segundaMaior}%</small></p>`;
            habilitarLikes('b2')
        }
        let repescagem=0
        let texto3=null
        for(let k=0;k<listaEsp.length;k++){
            const porcentagem=Math.round(listaEsp[k].likes*100/listaEsp[k].votos)
            if(porcentagem>repescagem && listaEsp[k].texto!=texto && listaEsp[k].texto!=texto2){
                repescagem=porcentagem;
                texto3=listaEsp[k].texto;
                l3=listaEsp[k];
            }
        }
        if(texto3!=null){
            document.querySelector(`.lista${planeta} l3`).innerHTML=`<p>${texto3} <small>${repescagem}%</small></p>`;
            habilitarLikes('b3')
        }
    })
}

function darLike(planeta,linha){
    let objeto={}
    let id=null
    desabilitarLikes('todos')
    if(linha==1){
        objeto={signo:l1.signo,texto:l1.texto,likes:(l1.likes+1),votos:(l1.votos+1)}
        id=l1.id
    }
    if(linha==2){
        objeto={signo:l2.signo,texto:l2.texto,likes:(l2.likes+1),votos:(l2.votos+1)}
        id=l2.id
    }
    if(linha==3){
        objeto={signo:l3.signo,texto:l3.texto,likes:(l3.likes+1),votos:(l3.votos+1)}
        id=l3.id
    }
    const promessa=axios.post(`https://62102e943fd066f7b2307f7d.mockapi.io/${planeta}`,objeto)
    promessa.then(()=>{
        const promessa2=axios.delete(`https://62102e943fd066f7b2307f7d.mockapi.io/${planeta}/${id}`);
        promessa2.then(()=>{carregarEnvios(planeta,objeto.signo)})
    })
}
function darDislike(planeta,linha){
    let objeto={}
    let id=null
    desabilitarLikes('todos')
    if(linha==1){
        objeto={signo:l1.signo,texto:l1.texto,likes:l1.likes,votos:(l1.votos + 1)}
        id=l1.id
    }
    if(linha==2){
        objeto={signo:l2.signo,texto:l2.texto,likes:l2.likes,votos:(l2.votos + 1)}
        id=l2.id
    }
    if(linha==3){
        objeto={signo:l3.signo,texto:l3.texto,likes:l3.likes,votos:(l3.votos + 1)}
        id=l3.id
    }
    const promessa=axios.post(`https://62102e943fd066f7b2307f7d.mockapi.io/${planeta}`,objeto)
    promessa.then(()=>{
        const promessa2=axios.delete(`https://62102e943fd066f7b2307f7d.mockapi.io/${planeta}/${id}`);
        promessa2.then(()=>{carregarEnvios(planeta,objeto.signo)})
    })
}

