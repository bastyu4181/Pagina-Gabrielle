const proyectosData = [
    { id: 1, nombre: "Branding Alma Mentorías", categoria: "Branding", descripcion: "Identidad visual completa", imagen: "assets/alma.jpg" },
    { id: 2, nombre: "Ilustración Pulpo", categoria: "Ilustración", descripcion: "Diseño creativo", imagen: "assets/Pulpo.jpg" },
    { id: 3, nombre: "Kinesfera Movimiento", categoria: "Redes Sociales", descripcion: "Piezas gráficas", imagen: "assets/kinesfera.jpg" },
    { id: 4, nombre: "Norma 27/28 OTC", categoria: "Diseño Publicitario", descripcion: "Infografía regulatoria", imagen: "assets/norma 27 28.jpg" },
    { id: 5, nombre: "Gastro Perú Branding", categoria: "Branding", descripcion: "Logotipo restaurante", imagen: "assets/gastro peru.png" },
    { id: 6, nombre: "JCM Salud Visual", categoria: "Social Media", descripcion: "Publicaciones clínica", imagen: "assets/jcm.jpg" }
];

let favoritosIds = [];

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
