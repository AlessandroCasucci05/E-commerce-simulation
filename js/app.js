
class Products{
    constructor(nome,utente,prezzo,desc){
        this.nome=nome;
        this.utente=utente;
        this.prezzo=prezzo;
        this.desc=desc;
    }
}
class Utente {
    constructor(nome, pass) {
        this.nome = nome;
        this.pass = pass;
    }
}
var carrello=[];
var loggato = logFatto();
var utente = nomeUtente();
nav();

var utenti = [];
var prodotti=[];


function nav() {
    const a1 = document.createElement("a");
    const a2 = document.createElement("a");
    const a3 = document.createElement("a");
    const a4 = document.createElement("a");
    const a5 = document.createElement("a");

    a1.innerText = "HomePage";
    a1.setAttribute("href", "index.html");
    a2.innerText = "Registrati";
    a2.setAttribute("href", "registrati.html");
    a3.innerText = "Carrello";
    a3.setAttribute("href", "carrello.html");
    a4.innerText = "Il mio negozio";
    a4.setAttribute("href", "tuonegozio.html");
    a5.innerText = utente;
    a5.classList.add("nomeutente");
    const nav = document.querySelector("nav");
    const div = document.createElement("div");
    div.classList.add("paginenav");
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");
    const li4 = document.createElement("li");
    li.appendChild(a1);
    li1.appendChild(a2);
    li2.appendChild(a3);
    li3.appendChild(a4);
    li4.appendChild(a5);

    if (loggato) {

        const li1 = document.createElement("li");
        const aa = document.createElement("a");
        aa.innerText = "LogOut";
        aa.style.cursor = "pointer";
        aa.addEventListener("click", logOUT);
        li1.appendChild(aa);
        ul.appendChild(li);
        ul.appendChild(li2);
        ul.appendChild(li3);
        ul.appendChild(li1);
        ul.appendChild(li4);
        div.appendChild(ul);
        nav.appendChild(div);

    } else {

        const li5 = document.createElement("li");
        li5.innerText = "LogIn";
        li5.style.cursor = "pointer";
        li5.addEventListener("click", log);
        ul.appendChild(li);
        ul.appendChild(li5);
        ul.appendChild(li1);
        div.appendChild(ul);
        nav.appendChild(div);
    }

}


//HomePage

let vett= [];


if (document.URL.includes("index.html")) {
    
    if (localStorage.getItem("prodotti")!=null){
        prodotti=localStorage.getItem("prodotti");
        prodotti=JSON.parse(prodotti);
        const cont= document.querySelector("#home-main");
        prodotti.forEach(element => {
             const sched= document.createElement("DIV");
             sched.classList.add("home-sched");
             const h=document.createElement("h3");
             const d=document.createElement("p");
             const p=document.createElement("p");
             const u=document.createElement("p");
             const b= document.createElement("button");
             u.id="nome-Utente";
             h.innerText=element.nome;
             d.innerText=element.desc;
             p.innerText=element.prezzo+"€";
             u.innerText=element.utente;
             b.innerText="Aggiungi al Carrello";
             sched.appendChild(h);
             sched.appendChild(u);
             sched.appendChild(d);
             sched.appendChild(p);
             sched.appendChild(b);
             cont.appendChild(sched);
             var scelto;
             var string = "carrello" + utente;
             
             b.addEventListener("click",() =>{
                 if (!loggato){
                     log();
                 }else{
                        prodotti=localStorage.getItem("prodotti");
                        prodotti=JSON.parse(prodotti);
                        
                            scelto= prodotti.filter(x=> {
                                return x.nome===h.innerText;
                                
                            })
                    if (localStorage.getItem(string)!==null){
                        carrello= localStorage.getItem(string);
                        carrello=JSON.parse(carrello);
                        carrello.push(scelto);
                    }else{
                        carrello=[];
                        carrello.push(scelto);
                    }

                    if (localStorage.getItem("vett")!==null){
                        vett= localStorage.getItem("vett");
                        vett=JSON.parse(vett);
                        
                    }



                    
                    
                    for (let i=0;i<carrello.length;i++){
                        for (let j=0;j<carrello[i].length;j++){
                            let a= carrello[i];
                            vett.push(a[j]);
                        }
                        
                    }

                    localStorage.setItem("vett",JSON.stringify(vett));
                    
                    console.log(vett);
                    localStorage.setItem(string,JSON.stringify(vett));
                    
                 }

             })
        });
    }
    
}


//Il mio Carrello


if (document.URL.includes("carrello.html")) {
    var string= "carrello"+utente;
    if (localStorage.getItem(string)!==null){
        carrello= localStorage.getItem(string);
        miocarrello=JSON.parse(carrello);
        
        
             miocarrello.forEach(x =>{
                let car = document.querySelector(".carrello"); 
                let div=document.createElement("div");
                div.classList.add("car-schede");
                let h= document.createElement("h3");
                let p= document.createElement("p");
                let p1= document.createElement("p");
                let p2= document.createElement("p");
                let b=document.createElement("button");
                b.innerText="Elimina";
                
                h.innerText=x.nome;
                p.innerText=x.utente;
                p1.innerText=x.desc;
                p2.innerText=x.prezzo+"€";
                div.appendChild(h);
                div.appendChild(p);
                div.appendChild(p1);
                div.appendChild(p2);
                div.appendChild(b);
                car.appendChild(div);

                b.addEventListener("click", () =>{
                    let appoggio=[];
                    for (let i=0;i<miocarrello.length;i++){
                        if (miocarrello[i].nome!==h.innerText){
                             appoggio.push(miocarrello[i]);
                        }
                    }
                    localStorage.setItem("vett",JSON.stringify(appoggio));
                    localStorage.setItem(string,JSON.stringify(appoggio));
                    div.style.display="none";
                })
           })
        
            
        
        
    }
      
}



//Registrazione


if (document.URL.includes("registrati.html")) {
    const user = document.querySelector("#username1");
    const pass = document.querySelector("#pass1");
    const confirm = document.querySelector("#confirm");
    const btn = document.querySelector("#reg");

    btn.addEventListener("click", (event) => {
        event.preventDefault();
        verifyForm(user, pass, confirm);
    })
}



//Il mio negozio


if (document.URL.includes("tuonegozio.html")) {
    if (!loggato) {
        window.location.replace('index.html');
    }
    
    if (localStorage.getItem("prodotti")!=null){

        prodotti=localStorage.getItem("prodotti");
        prodotti=JSON.parse(prodotti);
        mieiprodotti=prodotti.filter(x=>{
            return x.utente===utente;
        });
        for (let i=0; i<mieiprodotti.length;i++){
             let nam= mieiprodotti[i].nome;
             let des=mieiprodotti[i].desc;
             let pre=mieiprodotti[i].prezzo;

        const divpadre = document.querySelector(".appendi");

        const divprodotti = document.createElement("div");
        const h3= document.createElement("h3");
        const p= document.createElement("p");
        const p1= document.createElement("p");
        const b= document.createElement("button");
        b.innerText="Elimina";
        h3.innerText=nam;
        p.innerText=des;
        p1.innerText=pre;
        divprodotti.appendChild(h3);
        divprodotti.appendChild(p);
        divprodotti.appendChild(p1);
        divprodotti.appendChild(b);
        divprodotti.classList.add("schede-neg");
        divpadre.appendChild(divprodotti);

        b.addEventListener("click", () =>{
            
            const titolo= h3.innerText;
            
            let prodotti1= prodotti.filter(x=> {
                return x.nome!==titolo;
            })
            prodotti=prodotti1;
            localStorage.setItem("prodotti",JSON.stringify(prodotti));
            divprodotti.style.display="none";
        })


        }
    }
    
    document.querySelector(".inserisci button").addEventListener("click", () => {
        const nam = document.querySelector("#neg-nome").value.trim();
        const des = document.querySelector("#neg-desc").value.trim();
        const pre = document.querySelector("#neg-prezzo").value.trim();

        document.querySelector("#neg-nome").value = "";
        document.querySelector("#neg-desc").value = "";
        document.querySelector("#neg-prezzo").value = "";


        const divpadre = document.querySelector(".appendi");

        const divprodotti = document.createElement("div");
        const h3= document.createElement("h3");
        const p= document.createElement("p");
        const p1= document.createElement("p");
        const b= document.createElement("button");
        b.innerText="Elimina";
        h3.innerText=nam;
        p.innerText=des;
        p1.innerText=pre;
        divprodotti.appendChild(h3);
        divprodotti.appendChild(p);
        divprodotti.appendChild(p1);
        divprodotti.appendChild(b);
        divprodotti.classList.add("schede-neg");
        divpadre.appendChild(divprodotti);

        prodotti.push(new Products(nam,utente,pre,des));
        
        localStorage.setItem("prodotti",JSON.stringify(prodotti));
        
        b.addEventListener("click", () =>{
            
            const titolo= h3.innerText;
            
            let prodotti1= prodotti.filter(x=> {
                return x.nome!==titolo;
            })
            prodotti=prodotti1;
            localStorage.setItem("prodotti",JSON.stringify(prodotti));
            divprodotti.style.display="none";
        })


    })
}


//Funzioni di servizio

function logFatto() {
    if (localStorage.getItem("log") !== null) {
        var bool = localStorage.getItem("log");
        bool = JSON.parse(bool);
        return bool;
    }

    return false;
}

function nomeUtente() {
    if (loggato) {
        if (localStorage.getItem("nomeUtente") !== null) {
            var nome = localStorage.getItem("nomeUtente");
            nome = JSON.parse(nome);
            return nome;
        }

    }
    return false;
}

function verifyForm(user, pass, confirm) {
    var cont = 0;
    if (user.value.trim() === "") {
        document.querySelector("#mancauser").innerText = "Campo username obbligatorio!";
    } else {
        cont++;
    }
    if (pass.value.trim() === "") {
        document.querySelector("#mancapass").innerText = "Campo password obbligatorio!";
    } else {
        cont++;
    }
    if (confirm.value.trim() === "") {
        document.querySelector("#passdiv").innerText = "Campo conferma password obbligatorio!";
    } else {
        cont++;
    }
    if (pass.value.trim() !== confirm.value.trim()) {
        document.querySelector("#passdiv").innerText = "Password diverse!";
    } else {
        cont++;
    }

    if (cont === 4) {
        utenti.push(new Utente(user.value.trim(), pass.value.trim()))
        window.location.replace('index.html');
        localStorage.setItem("data", JSON.stringify(utenti));
        log();
    }
}

function log() {
    document.querySelector(".login").style.display = "flex";
    document.querySelector(".btn-log").addEventListener("click", () => {
        const username = document.querySelector("#username").value.trim();
        const passw = document.querySelector("#pass").value.trim();
        utenti = localStorage.getItem("data");
        utenti = JSON.parse(utenti);
        for (let i = 0; i < utenti.length; i++) {
            if (utenti[i].nome === username) {
                if (utenti[i].pass === passw) {
                    localStorage.setItem("log", JSON.stringify(true));
                    localStorage.setItem("nomeUtente", JSON.stringify(username));
                    document.querySelector(".login").style.display = "none";
                    document.location.reload();
                    window.location.replace('index.html');
                }
            }
        }

        document.querySelector(".log-no").innerText = "User o password non corretti :(";
    })
}

function logOUT() {
    localStorage.removeItem("log");
    localStorage.removeItem("nomeUtente");
    document.location.reload();
    window.location.replace('index.html');
}