// Arreglo de objetos con los datos de los proyectos
const misProyectos = [
    {
        id: 1,
        titulo: "Día del Pulpo - Máncora Beach",
        descripcion: "Diseño publicitario para redes sociales celebrando la gastronomía peruana.",
        imagen: "assets/Pulpo.jpg"
    },
    {
        id: 2,
        titulo: "Kinesfera Studio",
        descripcion: "Imagen publicitaria interactiva desarrollada durante el proceso de incubación con Digevo.",
        imagen: "assets/kinesfera.jpg"
    },
    {
        id: 3,
        titulo: "Norma 2728 - Cenglobal",
        descripcion: "Diseño informativo y corporativo sobre las regulaciones de los organismos de capacitación.",
        imagen: "assets/norma 27 28.jpg"
    }
];

// Logica para abrir y cerrar el menu hamburguesa
function inicializarMenu() {
    const boton = document.querySelector('.menu-hamburguesa');
    const enlaces = document.querySelector('.nav-links');
    const itemsMenu = document.querySelectorAll('.nav-links a');

    if (!boton || !enlaces) return;

    // Abre o cierra el menu al hacer click en las lineas
    boton.addEventListener('click', () => {
        const estaActivo = enlaces.classList.toggle('nav-active');
        boton.setAttribute('aria-expanded', estaActivo ? 'true' : 'false');
    });

    // Cierra el menu automaticamente al pinchar una opcion (para celular)
    itemsMenu.forEach(item => {
        item.addEventListener('click', () => {
            enlaces.classList.remove('nav-active');
            boton.setAttribute('aria-expanded', 'false');
        });
    });
}

// Carga las tarjetas del portafolio usando el DOM
function cargarProyectosDinamicos() {
    const contenedor = document.querySelector('.logos');
    if (!contenedor) return;

    contenedor.innerHTML = "";

    // ForEach para recorrer los datos e inyectarlos al HTML
    misProyectos.forEach(proyecto => {
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('tarjeta-producto-dinamica');

        const titulo = document.createElement('h5');
        titulo.textContent = proyecto.titulo; // textContent por seguridad XSS

        const img = document.createElement('img');
        img.src = proyecto.imagen;
        img.alt = proyecto.titulo;

        const parrafo = document.createElement('p');
        parrafo.textContent = proyecto.descripcion;

        // Meter las etiquetas dentro de la tarjeta
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(img);
        tarjeta.appendChild(parrafo);

        // Meter la tarjeta en el contenedor principal de la pagina
        contenedor.appendChild(tarjeta);
    });
}

// Ejecuta las funciones cuando el HTML este cargado por completo
document.addEventListener('DOMContentLoaded', () => {
    inicializarMenu();
    cargarProyectosDinamicos();
});
