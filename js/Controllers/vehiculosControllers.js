document.addEventListener("DOMContentLoaded", () => {
    inicializarControlesInterfaz();
    inicializarEventosVehiculos();
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
            });
        }
    }
}

function inicializarEventosVehiculos() {
    const elementoModal = document.getElementById('modal-vehiculo');
    if (!elementoModal) return;

    const modalVehiculo = new bootstrap.Modal(elementoModal, {
        keyboard: false,
        backdrop: 'static' 
    });

    const btnAbrirModal = document.getElementById('btn-abrir-modal-vehiculo');
    const btnEnviarRegistro = document.getElementById('btn-enviar-registro');
    const capaExito = document.getElementById('capa-exito');
    const btnAceptarExito = document.getElementById('btn-aceptar-exito');
    const formularioNuevoVehiculo = document.getElementById('formulario-nuevo-vehiculo');

    if (btnAbrirModal) {
        btnAbrirModal.addEventListener('click', () => {
            modalVehiculo.show();
        });
    }

    if (formularioNuevoVehiculo) {
        formularioNuevoVehiculo.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            if (!formularioNuevoVehiculo.checkValidity()) {
                e.stopPropagation();
                formularioNuevoVehiculo.classList.add('was-validated');
                return;
            }

            try {
                btnEnviarRegistro.disabled = true;
                btnEnviarRegistro.textContent = "Registrando...";

                await ServicioVehiculos.registrarVehiculo();

                if (capaExito) capaExito.classList.remove('d-none');
            } catch (error) {
                alert("Ocurrió un error al registrar. Inténtelo de nuevo.");
            } finally {
                btnEnviarRegistro.disabled = false;
                btnEnviarRegistro.textContent = "Registrar Vehículo";
            }
        });
    }

    if (btnAceptarExito) {
        btnAceptarExito.addEventListener('click', () => {
            if (capaExito) capaExito.classList.add('d-none');
            modalVehiculo.hide();
            if (formularioNuevoVehiculo) {
                formularioNuevoVehiculo.reset();
                formularioNuevoVehiculo.classList.remove('was-validated');
            }
        });
    }
}