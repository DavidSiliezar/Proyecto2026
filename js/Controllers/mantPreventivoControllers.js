document.addEventListener("DOMContentLoaded", () => {
    inicializarControlesInterfaz();
    inicializarEventosMantenimiento();
});

function inicializarControlesInterfaz() {
    const btnMovil = document.getElementById('btn-menu-movil');
    const btnEscritorio = document.querySelector('.interruptor-menu');
    const barraLateral = document.getElementById('barra-lateral');

    if (barraLateral) {
        if (btnMovil) {
            btnMovil.addEventListener('click', () => {
                barraLateral.classList.toggle('mostrar');
            });
        }
        
        if (btnEscritorio) {
            btnEscritorio.addEventListener('click', () => {
                barraLateral.classList.toggle('colapsado');
                
                // Si la barra se colapsa, cerramos los submenús de Bootstrap
                const submenus = document.querySelectorAll('.collapse.show');
                submenus.forEach(submenu => {
                    const bsCollapse = new bootstrap.Collapse(submenu, { toggle: false });
                    bsCollapse.hide();
                });
            });
        }
    }
}

function inicializarEventosMantenimiento() {
    const elementoModal = document.getElementById('modal-mantenimiento');
    if (!elementoModal) return;

    const modalMantenimiento = new bootstrap.Modal(elementoModal, {
        keyboard: false,
        backdrop: 'static' 
    });

    const btnAbrirModal = document.getElementById('btn-abrir-modal-mantenimiento');
    const btnEnviarRegistro = document.getElementById('btn-enviar-registro');
    const capaExito = document.getElementById('capa-exito');
    const btnAceptarExito = document.getElementById('btn-aceptar-exito');
    const formularioMantenimiento = document.getElementById('formulario-mantenimiento');
    
    if (btnAbrirModal) {
        btnAbrirModal.addEventListener('click', () => {
            modalMantenimiento.show();
        });
    }

    if (btnEnviarRegistro) {
        btnEnviarRegistro.addEventListener('click', async (e) => {
            e.preventDefault(); 

            try {
                btnEnviarRegistro.disabled = true;
                btnEnviarRegistro.textContent = "Guardando...";

                await ServicioMantenimiento.registrarMantenimiento();

                if (capaExito) capaExito.classList.remove('d-none');
            } catch (error) {
                alert("Ocurrió un error. Inténtelo de nuevo.");
            } finally {
                btnEnviarRegistro.disabled = false;
                btnEnviarRegistro.textContent = "Guardar";
            }
        });
    }

    if (btnAceptarExito) {
        btnAceptarExito.addEventListener('click', () => {
            if (capaExito) capaExito.classList.add('d-none');
            modalMantenimiento.hide();
            if (formularioMantenimiento) formularioMantenimiento.reset();
        });
    }
}