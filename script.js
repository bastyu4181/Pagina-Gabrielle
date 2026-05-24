/**
 * PORTAFOLIO INTERACTIVO - GABRIELLE SAAVEDRA
 * Lógica para Evaluación Sumativa 2 - Programación Frontend
 */

// ==========================================
// 1. ESTRUCTURA DE DATOS: ARREGLO DE OBJETOS
// ==========================================
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

// ==========================================
// 2. MENÚ DE NAVEGACIÓN DINÁMICO
// ==========================================
function inicializarMenu() {
    const boton = document.querySelector('.menu-hamburguesa');
    const enlaces = document.querySelector('.nav-links');

    if (!boton || !enlaces) return;

    boton.addEventListener('click', () => {
        // Alternar la clase activa para mostrar/ocultar
        const estaActivo = enlaces.classList.toggle('nav-active');
        
        // Control de accesibilidad dinámico (ARIA)
        boton.setAttribute('aria-expanded', estaActivo ? 'true' : 'false');
    });
}

// ==========================================
// 3. CARGA DINÁMICA DE CONTENIDO (DOM)
// ==========================================
function cargarProyectosDinamicos() {
    const contenedor = document.querySelector('.logos');
    if (!contenedor) return;

    // Limpiar contenedor por seguridad
    contenedor.innerHTML = "";

    // Procesar los datos con un método estructurado (forEach)
    misProyectos.forEach(proyecto => {
        // Crear elementos estructurales de forma segura
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('tarjeta-producto-dinamica');

        const titulo = document.createElement('h5');
        // BUENA PRÁCTICA SEGURIDAD: textContent evita inyecciones de código (XSS)
        titulo.textContent = proyecto.titulo; 

        const img = document.createElement('img');
        img.src = proyecto.imagen;
        img.alt = proyecto.titulo;

        const parrafo = document.createElement('p');
        parrafo.textContent = proyecto.descripcion;

        // Unir los nodos secundarios al elemento padre
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(img);
        tarjeta.appendChild(parrafo);

        // Inyectar la tarjeta completa al DOM de la página
        contenedor.appendChild(tarjeta);
    });
}

// ==========================================
// CONTROLADOR PRINCIPAL DE EVENTOS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    inicializarMenu();
    cargarProyectosDinamicos();
});