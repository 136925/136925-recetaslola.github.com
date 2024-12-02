document.addEventListener('DOMContentLoaded', cargarRecetasLS);

let recetas = [];

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('#searchInput');
    searchInput.addEventListener('input', buscarRecetas);
});


    function buscarRecetas() {
        const busqueda = document.querySelector('#searchInput').value.toLowerCase();
        const recetasFiltradas = recetas.filter(receta => 
            receta.nombre.toLowerCase().includes(busqueda) ||
            receta.descripcion.toLowerCase().includes(busqueda) ||
            receta.numero.toLowerCase().includes(busqueda)
        );
        mostrarRecetasFiltradas(recetasFiltradas);
    }

function mostrarRecetasFiltradas(recetasFiltradas) {
    const container = document.getElementById('listaRecetas');
    container.innerHTML = '';
    recetasFiltradas.forEach(receta => {
        container.innerHTML += generarHTMLReceta(receta);
    });
}

function mostrarRecetas() {
    mostrarRecetasFiltradas(recetas);
}

function generarHTMLReceta(receta) {
    return `
    <div class="col-md-4 mt-3">
        <div class="card text-dark bg-light">
            <img src="${receta.imagen}" class="card-img-top img-fluid " alt="${receta.nombre}">
            <div class="card-body">
                <h4>${receta.numero}</h4>
                <h5 class="card-subtitle mb-2 text-muted">Precio: ${receta.precio}</h5>
                <h5 class="card-text">${receta.descripcion}</h5>
                <h5 class="card-text"><strong>Precio: </strong>${receta.precio}</h5>
            </div>
        </div>
    </div>`;
}

function guardarReceta() {
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    
    if (!file) {
        const receta = {
            nombre: document.getElementById('nombre').value,
            numero: document.getElementById('numero').value,
            descripcion: document.getElementById('descripcion').value,
            costo: document.getElementById('costo').value,
            precio: document.getElementById('precio').value,
            imagen: ''
        };
        
        recetas.push(receta);
        guardarRecetasLS();
        mostrarRecetas();
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const receta = {
            nombre: document.getElementById('nombre').value,
            numero: document.getElementById('numero').value,
            descripcion: document.getElementById('descripcion').value,
            costo: document.getElementById('costo').value,
            precio: document.getElementById('precio').value,
            imagen: e.target.result
        };
        
        recetas.push(receta);
        guardarRecetasLS();
        mostrarRecetas();
    }
    
    reader.readAsDataURL(file);
}

function guardarRecetasLS() {
    localStorage.setItem('recetas', JSON.stringify(recetas));
}

function cargarRecetasLS() {
    const recetasGuardadas = localStorage.getItem('recetas');
    if (recetasGuardadas) {
        recetas = JSON.parse(recetasGuardadas);
        mostrarRecetas();
    }
}

function borrarRecetaLS() {
    localStorage.removeItem('recetas');
    location.reload();
}