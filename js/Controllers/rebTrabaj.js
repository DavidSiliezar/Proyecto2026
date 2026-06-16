document.addEventListener("DOMContentLoaded", () => {
    inicializarControlesInterfaz();
    inicializarEventosFormulario();
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

function inicializarEventosFormulario() {
    const btnGuardar = document.getElementById('btnGuardar');
    const modalExito = document.getElementById('modalExito');
    const formulario = document.getElementById('formularioRegistro');

    if (btnGuardar && modalExito && formulario) {
        btnGuardar.addEventListener('click', async () => {
            if (formulario.checkValidity()) {
                const respuesta = await ServicioRegistrarTrabajador.registrar({});
                if (respuesta.exito) {
                    modalExito.classList.add('activo');
                }
            } else {
                formulario.reportValidity();
            }
        });
    }
}