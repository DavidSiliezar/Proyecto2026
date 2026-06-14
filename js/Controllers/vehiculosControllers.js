document.addEventListener("DOMContentLoaded", () => {
    inicializarControlesInterfaz();
    inicializarEventosVehiculos();
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

    if (btnEnviarRegistro) {
        btnEnviarRegistro.addEventListener('click', async (e) => {
            e.preventDefault(); 

            try {
                btnEnviarRegistro.disabled = true;
                btnEnviarRegistro.textContent = "Registrando...";

                await ServicioVehiculos.registrarVehiculo();

                if (capaExito) capaExito.classList.remove('d-none');
            } catch (error) {
                alert("Ocurrió un error al registrar. Inténtelo de nuevo.");
            } finally {
                btnEnviarRegistro.disabled = false;
                btnEnviarRegistro.textContent = "Registrar";
            }
        });
    }

    if (btnAceptarExito) {
        btnAceptarExito.addEventListener('click', () => {
            if (capaExito) capaExito.classList.add('d-none');
            modalVehiculo.hide();
            if (formularioNuevoVehiculo) formularioNuevoVehiculo.reset();
        });
    }
}