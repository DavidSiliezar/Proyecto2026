document.addEventListener("DOMContentLoaded", () => {
    inicializarControlesInterfaz();
    inicializarEventosAccidentes();
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

function inicializarEventosAccidentes() {
    const elementoModal = document.getElementById('modal-accidente');
    if (!elementoModal) return;

    const modalAccidente = new bootstrap.Modal(elementoModal, {
        keyboard: false,
        backdrop: 'static' 
    });

    const btnAbrirModal = document.getElementById('btn-abrir-modal-accidente');
    const btnEnviarRegistro = document.getElementById('btn-enviar-registro');
    const capaExito = document.getElementById('capa-exito');
    const btnAceptarExito = document.getElementById('btn-aceptar-exito');
    const formularioAccidente = document.getElementById('formulario-accidente');

    if (btnAbrirModal) {
        btnAbrirModal.addEventListener('click', () => {
            modalAccidente.show();
        });
    }

    if (btnEnviarRegistro) {
        btnEnviarRegistro.addEventListener('click', async (e) => {
            e.preventDefault(); 

            try {
                btnEnviarRegistro.disabled = true;
                btnEnviarRegistro.textContent = "Guardando...";

                // Llamada al Service simulado
                await ServicioAccidentes.registrarAccidente();

                if (capaExito) capaExito.classList.remove('d-none');
            } catch (error) {
                alert("Ocurrió un error al registrar. Inténtelo de nuevo.");
            } finally {
                btnEnviarRegistro.disabled = false;
                btnEnviarRegistro.textContent = "Guardar registro";
            }
        });
    }

    if (btnAceptarExito) {
        btnAceptarExito.addEventListener('click', () => {
            if (capaExito) capaExito.classList.add('d-none');
            modalAccidente.hide();
            if (formularioAccidente) formularioAccidente.reset();
        });
    }
}