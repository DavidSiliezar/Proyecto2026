document.addEventListener("DOMContentLoaded", async () => {
    inicializarControlesInterfaz();
    await renderizarReportes();
});

function inicializarControlesInterfaz() {
    const btnMovil = document.getElementById('btn-menu-movil');
    const btnEscritorio = document.getElementById('btn-escritorio');
    const barraLateral = document.getElementById('barra-lateral');
    const contenidoPrincipal = document.getElementById('contenido-principal');

    if (barraLateral) {
        if (btnMovil) {
            btnMovil.addEventListener('click', () => {
                barraLateral.classList.toggle('mostrar');
            });
        }
        
        if (btnEscritorio) {
            btnEscritorio.addEventListener('click', () => {
                barraLateral.classList.toggle('colapsado');
                
                if (contenidoPrincipal) {
                    contenidoPrincipal.classList.toggle('expandida');
                }

                const submenus = document.querySelectorAll('.collapse.show');
                submenus.forEach(submenu => {
                    const bsCollapse = new bootstrap.Collapse(submenu, { toggle: false });
                    bsCollapse.hide();
                });
            });
        }
    }
}

async function renderizarReportes() {
    const contenedor = document.getElementById('contenedor-reportes');
    if (!contenedor) return;

    const reportes = await ServicioReportes.obtenerReportes();
    let htmlContenido = '';

    reportes.forEach(reporte => {
        const claseEstado = reporte.estado === 'revision' ? 'estado-revision' : 'estado-atendido';
        const textoEstado = reporte.estado === 'revision' ? 'En revisión' : 'Atendido';

        htmlContenido += `
            <article class="tarjeta-reporte">
                <img src="${reporte.img}" alt="Fotografía del reporte" class="imagen-reporte" onerror="this.src='../img/placeholder.jpg'">
                <div class="detalles-reporte">
                    <span class="insignia-estado ${claseEstado}">${textoEstado}</span>
                    <h3 class="numero-reporte">${reporte.id}</h3>
                    <p class="fecha-hora"><i class="fa-regular fa-calendar"></i> ${reporte.fecha}</p>
                    <p class="ubicacion"><i class="fa-solid fa-location-dot"></i> ${reporte.ubicacion}</p>
                </div>
                <div class="icono-flecha">
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
            </article>
        `;
    });

    contenedor.innerHTML = htmlContenido;
}