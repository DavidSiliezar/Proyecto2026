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
        const claseEstado = reporte.estado === 'revision' ? 'bg-warning text-dark' : 'bg-success text-white';
        const textoEstado = reporte.estado === 'revision' ? 'En revisión' : 'Atendido';

        htmlContenido += `
            <a href="./VerReporteConductor.html?id=${reporte.id}" class="tarjeta-reporte text-decoration-none">
                <div class="imagen-contenedor position-relative">
                    <img src="${reporte.img}" alt="Fotografía del reporte" class="imagen-reporte" onerror="this.src='https://placehold.co/400x300/e2e8f0/475569?text=Sin+Foto'">
                    <span class="insignia-estado badge ${claseEstado} position-absolute top-0 end-0 m-3 shadow-sm px-3 py-2 rounded-pill">${textoEstado}</span>
                </div>
                <div class="detalles-reporte p-4 d-flex flex-column flex-grow-1">
                    <div>
                        <h3 class="numero-reporte fw-bold text-dark mb-3 fs-5"><i class="fa-solid fa-file-invoice text-primary me-2"></i>Reporte #${reporte.id}</h3>
                        <p class="fecha-hora text-secondary mb-2 fs-6"><i class="fa-regular fa-calendar me-2" style="width: 16px;"></i>${reporte.fecha}</p>
                        <p class="ubicacion text-secondary mb-0 fs-6 text-truncate"><i class="fa-solid fa-location-dot me-2" style="width: 16px;"></i>${reporte.ubicacion}</p>
                    </div>
                    <div class="mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
                        <span class="texto-accion text-primary fw-semibold" style="font-size: 14px;">Ver detalles del reporte</span>
                        <div class="icono-flecha bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
                            <i class="fa-solid fa-chevron-right fs-6"></i>
                        </div>
                    </div>
                </div>
            </a>
        `;
    });

    contenedor.innerHTML = htmlContenido;
}