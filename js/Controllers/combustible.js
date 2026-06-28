document.addEventListener("DOMContentLoaded", async () => {
    inicializarControlesInterfaz();
    await renderizarRegistrosCombustible();
});

function inicializarControlesInterfaz() {
    const btnMenuMovil = document.getElementById('btn-menu-movil');
    const btnMenuEscritorio = document.getElementById('btn-menu-escritorio');
    const barraLateral = document.getElementById('barra-lateral');
    const contenidoPrincipal = document.getElementById('contenido-principal');

    if (barraLateral) {
        if (btnMenuMovil) {
            btnMenuMovil.addEventListener('click', () => {
                barraLateral.classList.toggle('mostrar');
            });
        }
        
        if (btnMenuEscritorio) {
            btnMenuEscritorio.addEventListener('click', () => {
                barraLateral.classList.toggle('colapsado');
                
                if (contenidoPrincipal) {
                    contenidoPrincipal.classList.toggle('expandida');
                }

                const submenusActivos = document.querySelectorAll('.collapse.show');
                submenusActivos.forEach(submenu => {
                    const instanciaColapso = new bootstrap.Collapse(submenu, { toggle: false });
                    instanciaColapso.hide();
                });
            });
        }
    }
    
    const btnFlechaDesplegable = document.getElementById('btn-flecha-desplegable');
    const submenuMantenimiento = document.getElementById('submenu-mantenimiento');

    if (submenuMantenimiento && btnFlechaDesplegable) {
        btnFlechaDesplegable.addEventListener('click', (evento) => {
            evento.preventDefault();
            evento.stopPropagation();
        });

        submenuMantenimiento.addEventListener('show.bs.collapse', () => {
            btnFlechaDesplegable.setAttribute('aria-expanded', 'true');
        });

        submenuMantenimiento.addEventListener('hide.bs.collapse', () => {
            btnFlechaDesplegable.setAttribute('aria-expanded', 'false');
        });
    }
    
    const botonesAccion = document.querySelectorAll('.boton-accion');
    botonesAccion.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            evento.stopPropagation();
        });
    });
}

async function renderizarRegistrosCombustible() {
    const contenedor = document.getElementById('contenedor-registros-combustible');
    if (!contenedor) return;

    try {
        const registros = await ServicioCombustible.obtenerRegistrosCombustible();
        let htmlContenido = '';

        registros.forEach(registro => {
            const colorTipo = registro.tipo.toLowerCase() === 'diésel' ? 'text-primary' : 'text-warning';
            
            htmlContenido += `
                <tr class="fila-registro shadow-sm" style="cursor: pointer;" onclick="window.location.href='./RegistroCombustible.html?recibo=${registro.recibo}'">
                    <td class="ps-4 py-3 border-0">
                        <div class="d-flex align-items-center gap-3">
                            <div class="bg-light rounded-circle d-flex align-items-center justify-content-center border" style="width: 40px; height: 40px;">
                                <i class="fa-solid fa-car text-secondary"></i>
                            </div>
                            <div>
                                <h6 class="m-0 fw-bold text-dark" style="font-size: 14px;">${registro.vehiculo}</h6>
                                <span class="text-muted font-monospace" style="font-size: 12px;">${registro.matricula}</span>
                            </div>
                        </div>
                    </td>
                    <td class="border-0 py-3 text-secondary" style="font-size: 13px;">${registro.fecha}</td>
                    <td class="border-0 py-3 text-dark fw-medium" style="font-size: 13px;">${registro.conductor}</td>
                    <td class="border-0 py-3 ${colorTipo} fw-bold" style="font-size: 13px;">${registro.tipo}</td>
                    <td class="border-0 py-3 text-dark fw-bold" style="font-size: 13px;">${registro.galones.toFixed(1)}</td>
                    <td class="border-0 py-3 text-secondary" style="font-size: 13px;">$${registro.costoGalon.toFixed(2)}</td>
                    <td class="border-0 py-3 text-success fw-bold" style="font-size: 14px;">$${registro.total.toFixed(2)}</td>
                    <td class="border-0 py-3 text-secondary fw-medium" style="font-size: 13px;">${registro.kilometraje}</td>
                    <td class="border-0 pe-4 py-3 text-end">
                        <div class="d-flex justify-content-end gap-1">
                            <button class="btn btn-light rounded-circle text-success p-0 d-flex align-items-center justify-content-center boton-accion" style="width: 32px; height: 32px; background-color: #e6fffa;" title="Ver Recibo"><i class="fa-solid fa-receipt" style="font-size: 13px;"></i></button>
                            <button class="btn btn-light rounded-circle text-primary p-0 d-flex align-items-center justify-content-center boton-accion" style="width: 32px; height: 32px; background-color: #eef2ff;" title="Editar Carga"><i class="fa-solid fa-pencil" style="font-size: 13px;"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        });

        contenedor.innerHTML = htmlContenido;

        const nuevosBotonesAccion = contenedor.querySelectorAll('.boton-accion');
        nuevosBotonesAccion.forEach(boton => {
            boton.addEventListener('click', (evento) => {
                evento.stopPropagation();
            });
        });

    } catch (error) {
        console.error("Error al renderizar los registros de combustible:", error);
        contenedor.innerHTML = '<tr><td colspan="9" class="text-center text-danger py-4">Error al cargar los datos.</td></tr>';
    }
}