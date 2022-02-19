const signos=['Capricórnio','Aquário','Peixes','Áries','Touro','Gêmeos','Câncer','Leão','Virgem','Libra','Escorpião','Sagitário']
const planetas=['Sol','Ascendente','Lua']
const usuarios=[]
let eu=null;
let l1=null;
let l2=null;
let l3=null;
let listaEsp=[]
let lu=null
const paginaCadastro=document.querySelector('.inicial')
const paginaUsuarios=document.querySelector('.principal')
const paginaSignos=document.querySelector('.signosUsuario')
jaSouAlguem()

function jaSouAlguem(){
    quemSou()
    if(eu!=null){
        carregarUsuarios()
        paginaUsuarios.classList.remove('some')

    }else{
        printarOpcoes()
    }
}

function quemSou(){
    jsonUsuario = window.localStorage.getItem('usuario');
    const usuario = JSON.parse(jsonUsuario)
    eu=usuario
}

function printarOpcoes(){
    paginaCadastro.classList.remove('some')
    for(let j=0;j<planetas.length;j++){
    paginaCadastro.innerHTML+=`
    <div class="labelSelect">
                <label><p>${planetas[j]}:</p></label>
                <select class="${planetas[j]}">
                    <option value="Não Sei" selected>Não sei</option>
                </select>
                </div>
    `
    }
    paginaCadastro.innerHTML+=`<button onclick="salvarUsuario()">Pronto!</button>`
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
        nome: document.querySelector('.inicial input').value,
        sol: sol.options[sol.selectedIndex].value,
        ascendente: asc.options[asc.selectedIndex].value,
        lua: lua.options[lua.selectedIndex].value
    }
    const promessa=axios.post('https://62102e943fd066f7b2307f7d.mockapi.io/users',usuario)
    promessa.then(()=>{console.log('uhuuu');
        paginaCadastro.classList.add('some')
        paginaUsuarios.classList.remove('some')
        carregarUsuarios()
        const jsonAux = JSON.stringify(usuario)
        window.localStorage.setItem('usuario', jsonAux)
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
            <li onclick="(buscarUsuario(${usuario.id}))">
                <ion-icon name="person-circle-outline"></ion-icon>
                <h1>${usuario.nome}</h1>
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
    console.log(objeto)
    paginaUsuarios.classList.add('some')
    paginaSignos.classList.remove('some')
    for(let k=0;k<signos.length;k++){
        if(objeto.sol==signos[k]){
        paginaSignos.innerHTML+=`
            <div class="planeta">
                <section>
                    <h1>SOL</h1>
                    <h1>em</h1>
                    <h1>${signos[k]}</h1>
                </section>
                <div class="bolaPlaneta desenhoSol"></div>
                <section>
                    <h1>Como é a personalidade do ser:</h1>
                    <ul class="listaSol">
                        <l1></l1>
                        <div class="botoesConcorda">
                            <button onclick="darLike('Sol',1)" class="like"><ion-icon name="thumbs-up-outline"></ion-icon></button>
                            <button onclick="darDislike('Sol',1)" class="dislike"><ion-icon name="thumbs-down-outline"></ion-icon></button>
                        </div>
                        <l2></l2>
                        <div class="botoesConcorda">
                            <button onclick="darLike('Sol','${signos[k]}',2)" class="like"><ion-icon name="thumbs-up-outline"></ion-icon></button>
                            <button onclick="darDislike('Sol','${signos[k]}',2)" class="dislike"><ion-icon name="thumbs-down-outline"></ion-icon></button>
                        </div>
                        <l3></l3>
                        <div class="botoesConcorda">
                            <button onclick="darLike('Sol','${signos[k]}',3)" class="like"><ion-icon name="thumbs-up-outline"></ion-icon></button>
                            <button onclick="darDislike('Sol','${signos[k]}',3)" class="dislike"><ion-icon name="thumbs-down-outline"></ion-icon></button>
                        </div>
                    </ul>
                    <div class="contribua">
                        <input class="inputSol" type="text" placeHolder="Contribua :)"></input>
                        <button onclick="enviar('Sol','${signos[k]}')"><ion-icon name="paper-plane-outline"></ion-icon></button>
                    </div>
                </section>
            </div>
            `
            carregarEnvios('Sol',signos[k])
        }
    }
    for(let k=0;k<signos.length;k++){
        if(objeto.ascendente==signos[k]){
        paginaSignos.innerHTML+=`
            <div class="planeta">
                <section>
                    <h1>ASCENDENTE</h1>
                    <h1>em</h1>
                    <h1>${signos[k]}</h1>
                </section>
                <div class="bolaPlaneta desenhoAscendente"></div>
                <section>
                    <h1>Como o ser se apresenta aos outros:</h1>
                    <ul class="listaAscendente">
                        <l1></l1>
                        <div class="botoesConcorda">
                            <button onclick="darLike('Ascendente','${signos[k]}',1)" class="like"><ion-icon name="thumbs-up-outline"></ion-icon></button>
                            <button onclick="darDislike('Ascendente','${signos[k]}',1)" class="dislike"><ion-icon name="thumbs-down-outline"></ion-icon></button>
                        </div>
                        <l2></l2>
                        <div class="botoesConcorda">
                            <button onclick="darLike('Ascendente','${signos[k]}',2)" class="like"><ion-icon name="thumbs-up-outline"></ion-icon></button>
                            <button onclick="darDislike('Ascendente','${signos[k]}',2)" class="dislike"><ion-icon name="thumbs-down-outline"></ion-icon></button>
                        </div>
                        <l3></l3>
                        <div class="botoesConcorda">
                            <button onclick="darLike('Ascendente','${signos[k]}',3)" class="like"><ion-icon name="thumbs-up-outline"></ion-icon></button>
                            <button onclick="darDislike('Ascendente','${signos[k]}',3)" class="dislike"><ion-icon name="thumbs-down-outline"></ion-icon></button>
                        </div>
                    </ul>
                    <div class="contribua">
                        <input class="inputAscendente" type="text" placeHolder="Contribua :)"></input>
                        <button onclick="enviar('Ascendente','${signos[k]}')"><ion-icon name="paper-plane-outline"></ion-icon></button>
                    </div>
                </section>
            </div>
            `
            carregarEnvios('Ascendente',signos[k])
        }
    }
    for(let k=0;k<signos.length;k++){
        if(objeto.lua==signos[k]){
        paginaSignos.innerHTML+=`
            <div class="planeta">
                <section>
                    <h1>LUA</h1>
                    <h1>em</h1>
                    <h1>${signos[k]}</h1>
                </section>
                <div class="bolaPlaneta desenhoLua"></div>
                <section>
                    <h1>Como o ser expressa seus sentimentos:</h1>
                    <ul class="listaLua">
                        <l1 class="c1"></l1>
                        <div class="botoesConcorda">
                            <button onclick="darLike('Lua','${signos[k]}',1)" class="like"><ion-icon name="thumbs-up-outline"></ion-icon></button>
                            <button onclick="darDislike('Lua',${signos[k]},1)" class="dislike"><ion-icon name="thumbs-down-outline"></ion-icon></button>
                        </div>
                        <l2></l2>
                        <div class="botoesConcorda">
                            <button onclick="darLike('Lua','${signos[k]}',2)" class="like"><ion-icon name="thumbs-up-outline"></ion-icon></button>
                            <button onclick="darDislike('Lua',${signos[k]},2)" class="dislike"><ion-icon name="thumbs-down-outline"></ion-icon></button>
                        </div>
                        <l3></l3>
                        <div class="botoesConcorda">
                            <button onclick="darLike('Lua','${signos[k]}',3)" class="like"><ion-icon name="thumbs-up-outline"></ion-icon></button>
                            <button onclick="darDislike('Lua',3)" class="dislike"><ion-icon name="thumbs-down-outline"></ion-icon></button>
                        </div>
                    </ul>
                    <div class="contribua">
                        <input class="inputLua" type="text" placeHolder="Contribua :)"></input>
                        <button onclick="enviar('Lua','${signos[k]}')"><ion-icon name="paper-plane-outline"></ion-icon></button>
                    </div>
                </section>
            </div>
            `
            carregarEnvios('Lua',signos[k])
        }
    }
}


function enviar(planeta,signo){
    const valor=document.querySelector(`.input${planeta}`).value
    const objeto={
        signo:signo,
        texto:valor,
        likes:1,
        votos:1
    }
    const promessa=axios.post(`https://62102e943fd066f7b2307f7d.mockapi.io/${planeta}`,objeto)
    promessa.then(()=>{console.log('foi')})
}

function carregarEnvios(planeta,signo){
    const promessa=axios.get(`https://62102e943fd066f7b2307f7d.mockapi.io/${planeta}`)
    listaEsp=[]//colocar o const depois
    promessa.then((resposta)=>{
        const lista=resposta.data
        lista.forEach((objeto)=>{if(objeto.signo==signo){listaEsp.push(objeto)}})
        maisVotado=0
        for(let k=0;k<listaEsp.length;k++){if(listaEsp[k].votos>maisVotado){maisVotado=listaEsp[k].votos}}
        let maiorPorcentagem=0
        let texto='opa'
        for(let k=0;k<listaEsp.length;k++){
            const porcentagem=Math.round(listaEsp[k].likes*100/listaEsp[k].votos)
            if(porcentagem>maiorPorcentagem && listaEsp[k].votos>maisVotado/3){maiorPorcentagem=porcentagem; texto=listaEsp[k].texto;l1=listaEsp[k]}
        }
        if(texto !== null){document.querySelector(`.lista${planeta} l1`).innerHTML= `<p>${texto}--${maiorPorcentagem}%--</p>`}
        let segundaMaior=0
        for(let k=0;k<listaEsp.length;k++){
            const porcentagem=Math.round(listaEsp[k].likes*100/listaEsp[k].votos)
            if(porcentagem>segundaMaior && porcentagem!=maiorPorcentagem && listaEsp[k].votos>maisVotado/10){segundaMaior=porcentagem; texto=listaEsp[k].texto;l2=listaEsp[k]}
        }
        if(texto!=null){document.querySelector(`.lista${planeta} l2`).innerHTML=`<p>${texto}--${maiorPorcentagem}%--</p>`}
        let repescagem=0
        for(let k=0;k<listaEsp.length;k++){
            const porcentagem=Math.round(listaEsp[k].likes*100/listaEsp[k].votos)
            if(porcentagem>repescagem && porcentagem!=segundaMaior && porcentagem!=maiorPorcentagem){repescagem=porcentagem; texto=listaEsp[k].texto;l3=listaEsp[k]}
        }
        if(texto!=null){document.querySelector(`.lista${planeta} l3`).innerHTML=texto + + `--${segundaMaior}%--`}
    })
    
}

function darLike(planeta,linha){
    let objeto={}
    if(linha==1){
        objeto={signo:l1.signo,texto:l1.texto,likes:l1.likes+1,votos:l1.votos+1}
    }
    if(linha==2){
        objeto={signo:l2.signo,texto:l2.texto,likes:l2.likes+1,votos:l2.votos+1}
    }
    if(linha==3){
        objeto={signo:l3.signo,texto:l3.texto,likes:l3.likes+1,votos:l3.votos+1}
    }
    const promessa=axios.post(`https://62102e943fd066f7b2307f7d.mockapi.io/${planeta}`,objeto)
    promessa.then(()=>{console.log('foihhhhh')})
}
function darDislike(planeta,linha){
    let objeto={}
    if(linha==1){
        objeto={signo:l1.signo,texto:l1.texto,likes:l1.likes+1,votos:l1.votos+1}
    }
    if(linha==2){
        objeto={signo:l2.signo,texto:l2.texto,likes:l2.likes+1,votos:l2.votos+1}
    }
    if(linha==3){
        objeto={signo:l3.signo,texto:l3.texto,likes:l3.likes,votos:l3.votos+1}
    }
    const promessa=axios.post(`https://62102e943fd066f7b2307f7d.mockapi.io/${planeta}`,objeto)
    promessa.then(()=>{console.log('foihhhhh')})
}