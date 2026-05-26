//datos proyecto
const proyectosData = [
    { id: 1, nombre: "Branding Alma Mentorías", categoria: "Branding", descripcion: "Identidad visual completa", imagen: "assets/alma.jpg" },
    { id: 2, nombre: "Ilustración Pulpo", categoria: "Ilustración", descripcion: "Diseño creativo", imagen: "assets/Pulpo.jpg" },
    { id: 3, nombre: "Kinesfera Movimiento", categoria: "Redes Sociales", descripcion: "Piezas gráficas", imagen: "assets/kinesfera.jpg" },
    { id: 4, nombre: "Norma 27/28 OTC", categoria: "Diseño Publicitario", descripcion: "Infografía regulatoria", imagen: "assets/norma 27 28.jpg" },
    { id: 5, nombre: "Gastro Perú Branding", categoria: "Branding", descripcion: "Logotipo restaurante", imagen: "assets/gastro peru.png" },
    { id: 6, nombre: "JCM Salud Visual", categoria: "Social Media", descripcion: "Publicaciones clínica", imagen: "assets/jcm.jpg" }
];

// Estado favoritos
let favoritosIds = [];

// Cargar desde localStorage
function cargarFavoritos() {
    const guardados = localStorage.getItem("misFavoritosPortfolio");
    favoritosIds = guardados ? JSON.parse(guardados) : [];
    actualizarContadores();
    renderizarFavoritosModal();
    renderizarTarjetas();
}

function guardarFavoritos() {
    localStorage.setItem("misFavoritosPortfolio", JSON.stringify(favoritosIds));
}

function toggleFavorito(id) {
    if (favoritosIds.includes(id)) {
        favoritosIds = favoritosIds.filter(favId => favId !== id);
    } else {
        favoritosIds.push(id);
    }
    guardarFavoritos();
    actualizarContadores();
    renderizarTarjetas();
    renderizarFavoritosModal();
}

function actualizarContadores() {
    const contadorHeader = document.getElementById("favCounter");
    const contadorModal = document.getElementById("modalTotalFav");
    if (contadorHeader) contadorHeader.textContent = favoritosIds.length;
    if (contadorModal) contadorModal.textContent = favoritosIds.length;
}

// Renderizar tarjetas
let filtroActual = "";

function renderizarTarjetas() {
    const container = document.getElementById("cardsContainer");
    if (!container) return;
    let proyectosFiltrados = proyectosData.filter(p =>
        p.nombre.toLowerCase().includes(filtroActual) ||
        p.categoria.toLowerCase().includes(filtroActual)
    );
    if (proyectosFiltrados.length === 0) {
        container.innerHTML = "<p style='text-align:center; grid-column:1/-1;'>No se encontraron proyectos.</p>";
        return;
    }
    container.innerHTML = "";
    proyectosFiltrados.forEach(proy => {
        const esFav = favoritosIds.includes(proy.id);
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img class="card-img" src="${proy.imagen}" alt="${proy.nombre}">
            <div class="card-body">
                <h3 class="card-title">${escapeHtml(proy.nombre)}</h3>
                <div class="card-category">${escapeHtml(proy.categoria)}</div>
                <p>${escapeHtml(proy.descripcion)}</p>
                <button class="fav-btn-card ${esFav ? 'active-fav' : ''}" data-id="${proy.id}">
                    ${esFav ? '❤️ En favoritos' : '♡ Agregar a favoritos'}
                </button>
            </div>
        `;
        const btn = card.querySelector(".fav-btn-card");
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleFavorito(proy.id);
        });
        container.appendChild(card);
    });
}

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

// Ventana emergente de favoritos
const modal = document.getElementById("favModal");
const openModalBtn = document.getElementById("openFavModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

function renderizarFavoritosModal() {
    const listaContainer = document.getElementById("favoritesListContainer");
    if (!listaContainer) return;
    const favoritosData = proyectosData.filter(p => favoritosIds.includes(p.id));
    if (favoritosData.length === 0) {
        listaContainer.innerHTML = "<p style='text-align:center; padding:1rem;'>💔 No tienes proyectos favoritos aún.</p>";
        return;
    }
    listaContainer.innerHTML = "";
    favoritosData.forEach(fav => {
        const item = document.createElement("div");
        item.className = "fav-item";
        item.innerHTML = `
            <img src="${fav.imagen}" alt="${fav.nombre}">
            <div class="fav-item-info">
                <h4>${escapeHtml(fav.nombre)}</h4>
                <small>${escapeHtml(fav.categoria)}</small>
            </div>
            <button class="remove-fav" data-id="${fav.id}">Eliminar</button>
        `;
        const btnEliminar = item.querySelector(".remove-fav");
        btnEliminar.addEventListener("click", () => toggleFavorito(fav.id));
        listaContainer.appendChild(item);
    });
}

// gestión de foco y ARIA en el modal
function abrirModal() {
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    closeModalBtn.focus();
    document.body.style.overflow = "hidden";
    renderizarFavoritosModal();
}
function cerrarModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    openModalBtn.focus();
}
if (openModalBtn) openModalBtn.addEventListener("click", abrirModal);
if (closeModalBtn) closeModalBtn.addEventListener("click", cerrarModal);
window.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") cerrarModal();
});

// Menu Hamburgesa
const hamburger = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");
if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        const expanded = hamburger.getAttribute("aria-expanded") === "true" ? false : true;
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("open");
        hamburger.setAttribute("aria-expanded", expanded);
        if (expanded) {
            const firstLink = navLinks.querySelector("a");
            if (firstLink) firstLink.focus();
        }
    });
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        });
    });
}

// Modo oscuro con local storage
const darkToggleBtn = document.getElementById("darkModeToggle");
if (darkToggleBtn) {
    const modoActual = localStorage.getItem("darkModePortfolio") === "true";
    if (modoActual) document.body.classList.add("dark");
    darkToggleBtn.textContent = modoActual ? "☀️" : "🌙";
    darkToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        localStorage.setItem("darkModePortfolio", isDark);
        darkToggleBtn.textContent = isDark ? "☀️" : "🌙";
    });
}

// Filtro en tiempo real
const filterInput = document.getElementById("filterInput");
if (filterInput) {
    filterInput.addEventListener("input", (e) => {
        filtroActual = e.target.value.toLowerCase();
        renderizarTarjetas();
    });
}
// VALIDACIÓN DE FORMULARIO 
const formContacto = document.getElementById("form-contacto");

if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que la página recargue

        let esValido = true;
        
        // Elementos
        const inputNombre = document.getElementById("nombreInput");
        const inputEmail = document.getElementById("emailInput");
        const inputMensaje = document.getElementById("mensajeInput");
        
        const errorNombre = document.getElementById("errorNombre");
        const errorEmail = document.getElementById("errorEmail");
        const errorMensaje = document.getElementById("errorMensaje");
        const mensajeExito = document.getElementById("mensajeExito");

        // 1. Validar Nombre
        if (inputNombre.value.trim().length < 3) {
            errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
            esValido = false;
        } else {
            errorNombre.textContent = "";
        }

        // 2. Validar Email con Expresión Regular
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(inputEmail.value.trim())) {
            errorEmail.textContent = "Ingresa un correo válido (ej: nombre@correo.com).";
            esValido = false;
        } else {
            errorEmail.textContent = "";
        }

        // 3. Validar Mensaje
        if (inputMensaje.value.trim().length < 10) {
            errorMensaje.textContent = "El mensaje debe tener al menos 10 caracteres.";
            esValido = false;
        } else {
            errorMensaje.textContent = "";
        }

        // 4. Sanitización y Envío Exitoso
        if (esValido) {
            mensajeExito.textContent = `¡Gracias por tu mensaje, ${inputNombre.value.trim()}! Te contactaré pronto.`;
            mensajeExito.style.display = "block";
            formContacto.reset(); // Limpia los campos
            
            // Ocultar mensaje de éxito después de 4 segundos
            setTimeout(() => { mensajeExito.style.display = "none"; }, 4000);
        } else {
            mensajeExito.style.display = "none";
        }
    });
}

// ==================== INICIALIZAR 
cargarFavoritos();
renderizarTarjetas();
