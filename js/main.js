window.addEventListener("load", () => {
    pedirPersonajesFetch();
})

const personajesContainer = document.querySelector(".personajes");
const arrowLeft = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');
const pageLeft = document.querySelector('.page-left');
const pageRight = document.querySelector('.page-right');
const pageActual = document.querySelector('.pagina-actual');

let pageContador = 1;

async function pedirPersonajesFetch() {  
    const url = `https://rickandmortyapi.com/api/character/?page=${pageContador}`;
    const resultado = await fetch(url);
    const respuesta = await resultado.json();
    cargarPersonajes(respuesta);
    const  botones = document.querySelectorAll(".btn");
    botonesEvents(botones,respuesta);
}

function cargarPersonajes(res) {
    const personajes = res.results;

    personajes.forEach(personaje => {
        const personajeContainer = document.createElement("div");
        personajeContainer.classList.add("personaje");
        let pId = personaje.id;

        if(personaje.id < 10)  pId = "00" + personaje.id;
        else if(personaje.id >= 10 && personaje.id < 100) pId = "0" + personaje.id;

        personajeContainer.innerHTML = `
        <div class="personaje-img">
            <img src="${personaje.image}" alt="${personaje.name}">
        </div>
        <div class="personaje-data">
            <p class="name">${personaje.name}</p>
            <p class="id">#${pId}</p>
        </div>
        <button class="btn" id="${personaje.id}">View deploy</button>
        `;
        personajesContainer.append(personajeContainer);
        
    })
    
}

function botonesEvents(btns,res) {
    const modal = document.querySelector(".modal");

    const i = document.createElement("i");
    i.classList.add("fa-solid","fa-x","cerrar-modal");
    
    btns.forEach(btn => {
        btn.addEventListener("click",(e)=> {
            modal.innerHTML = "";
            const id = e.currentTarget.id;
            const personajes = res.results;
            const personajeElegido = personajes.find(personaje => personaje.id == id);
            modal.style.display = "block"

            const modalContainer = document.createElement("div");
            modalContainer.classList.add("modal-container");
            modalContainer.innerHTML = `
                

                <div class="modal-img">
                    <img src="${personajeElegido.image}" alt="${personajeElegido.name}">
                </div>

                <div class="modal-text">
                    <p class="modal-name">Name: <span>${personajeElegido.name}</span></p>
                    <p class="modal-especie">Species: <span>${personajeElegido.species}</span></p>
                    <p class="modal-gender">Gender: <span>${personajeElegido.gender}</span></p>
                    <p class="modal-origen">Origin: <span>${personajeElegido.location.name}</span></p>
                    <p class="modal-origen">Status: <span>${personajeElegido.status}</span></p>
                </div>
            `;
            modal.append(modalContainer);
            modalContainer.append(i);

            const btnCerrar = document.querySelector(".cerrar-modal");
            
            btnCerrar.addEventListener("click", ()=> {
                modal.style.display = "none";
            })
            
        })
        
    })
    
}

arrowLeft.addEventListener('click', () => {
    if(pageContador > 1) {
        pageContador--;
        personajesContainer.innerHTML = '';
        pageActual.innerText = pageContador;
        pageLeft.innerText = Number(pageLeft.innerText) - 1;
        pageRight.innerText = Number(pageRight.innerText) - 1;
        pedirPersonajesFetch();
    }
})

arrowRight.addEventListener('click', () => {
    if(pageContador != 42) {
        pageContador++;
        personajesContainer.innerHTML = '';
        pageActual.innerText = pageContador;
        pageLeft.innerText = Number(pageActual.innerText) - 1;
        pageRight.innerText = Number(pageActual.innerText) + 1;
        pedirPersonajesFetch();
    } else {
        pageActual.innerText = 'MAX';
    }

})

