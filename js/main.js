window.addEventListener("load", () => {
    pedirPersonajesFetch();
})

async function pedirPersonajesFetch() {
    const url = "https://rickandmortyapi.com/api/character";
    const resultado = await fetch(url);
    const respuesta = await resultado.json();
    cargarPersonajes(respuesta);
    const  botones = document.querySelectorAll(".btn");
    botonesEvents(botones,respuesta);
}

function cargarPersonajes(res) {
    const personajes = res.results;
    const personajesContainer = document.querySelector(".personajes");

    personajes.forEach(personaje => {
        const personajeContainer = document.createElement("div");
        personajeContainer.classList.add("personaje");
        
        personajeContainer.innerHTML = `
        <div class="personaje-img">
            <img src="${personaje.image}" alt="${personaje.name}">
        </div>
        <div class="personaje-data">
            <p class="name">${personaje.name}</p>
            <p class="especie">${personaje.species}</p>
            <p class="gender">${personaje.gender}</p>
            <p class="location">${personaje.location.name}</p>
            <p class="id">${personaje.id}</p>
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
