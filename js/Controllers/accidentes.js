document.addEventListener("DOMContentLoaded", async () => {
    inicializarControlesInterfaz();
    await renderizarRegistrosAccidentes();
    inicializarEnvioFormulario();
});

function inicializarControlesInterfaz() {
    const btnMenuMovil = document.getElementById('btn-menu-movil');
    const btnMenuEscritorio = document.getElementById('btn-escritorio');
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
}

async function renderizarRegistrosAccidentes() {
    const contenedor = document.getElementById('contenedor-registros-accidentes');
    if (!contenedor) return;

    try {
        const registros = await ServicioAccidentes.obtenerAccidentes();
        let htmlContenido = '';

        registros.forEach(registro => {
            let claseGravedad = 'leve';
            if (registro.gravedad.toLowerCase() === 'moderado') claseGravedad = 'moderado';
            if (registro.gravedad.toLowerCase() === 'grave') claseGravedad = 'grave';

            let claseEstado = registro.estado.toLowerCase() === 'resuelto' ? 'resuelto' : 'en-proceso';
            let iconoEstado = registro.estado.toLowerCase() === 'resuelto' ? '<i class="fa-solid fa-circle shadow-none" style="font-size: 8px;"></i>' : '<i class="fa-solid fa-spinner fa-spin shadow-none" style="font-size: 10px;"></i>';

            htmlContenido += `
                <tr class="fila-registro-accidentes">
                    <td class="ps-4">
                        <div class="d-flex align-items-center gap-3">
                            <div class="icono-contenedor-vehiculo d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-car text-secondary"></i>
                            </div>
                            <div>
                                <h6 class="m-0 fw-bold text-dark" style="font-size: 14px;">${registro.vehiculo}</h6>
                                <span class="text-muted font-monospace" style="font-size: 12px;">${registro.placa}</span>
                            </div>
                        </div>
                    </td>
                    <td class="text-secondary" style="font-size: 13px;">${registro.fecha}</td>
                    <td class="text-dark fw-medium" style="font-size: 13px;">${registro.conductor}</td>
                    <td><span class="badge-gravedad ${claseGravedad}">${registro.gravedad}</span></td>
                    <td class="text-dark fw-medium" style="font-size: 13px;">${registro.aseguradora}</td>
                    <td class="text-secondary font-monospace" style="font-size: 13px;">${registro.poliza}</td>
                    <td><span class="badge-estado ${claseEstado}">${iconoEstado} ${registro.estado}</span></td>
                    <td class="pe-4 text-end">
                        <div class="d-flex justify-content-end gap-2">
                            <button class="btn-tabla-accion" style="background-color: #fef2f2; color: #EF4444;" title="Ver Reporte Siniestro" onclick="evento.stopPropagation();"><i class="fa-solid fa-file-invoice"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        });

        contenedor.innerHTML = htmlContenido;

    } catch (error) {
        console.error(error);
        contenedor.innerHTML = '<tr><td colspan="8" class="text-center text-danger py-4">Error al cargar los datos de siniestros.</td></tr>';
    }
}

function inicializarEnvioFormulario() {
    const formulario = document.getElementById('formulario-accidentes');
    const btnEnviarRegistro = document.getElementById('btn-enviar-registro');
    const capaExito = document.getElementById('capa-exito');
    const btnAceptarExito = document.getElementById('btn-aceptar-exito');
    const nodoModal = document.getElementById('modalAccidente');
    
    if (!formulario || !nodoModal) return;

    const modalAccidente = bootstrap.Modal.getInstance(nodoModal) || new bootstrap.Modal(nodoModal);

    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        
        if (!formulario.checkValidity()) {
            evento.stopPropagation();
            formulario.classList.add('was-validated');
            return;
        }

        try {
            btnEnviarRegistro.disabled = true;
            btnEnviarRegistro.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Guardando...';

            const datos = {
                vehiculo: document.getElementById('select-vehiculo').value,
                conductor: document.getElementById('select-conductor').value,
                fecha: document.getElementById('input-fecha').value,
                gravedad: document.getElementById('select-gravedad').value,
                aseguradora: document.getElementById('input-aseguradora').value,
                poliza: document.getElementById('input-poliza').value,
                descripcion: document.getElementById('textarea-descripcion').value
            };

            await ServicioAccidentes.registrarAccidente(datos);

            if (capaExito) {
                capaExito.classList.remove('d-none');
            }

        } catch (error) {
            alert("Ocurrió un error al registrar. Inténtelo de nuevo.");
        } finally {
            btnEnviarRegistro.disabled = false;
            btnEnviarRegistro.innerHTML = 'Guardar registro';
        }
    });

    if (btnAceptarExito) {
        btnAceptarExito.addEventListener('click', () => {
            if (capaExito) {
                capaExito.classList.add('d-none');
            }
            modalAccidente.hide();
            formulario.reset();
            formulario.classList.remove('was-validated');
            renderizarRegistrosAccidentes();
        });
    }
}