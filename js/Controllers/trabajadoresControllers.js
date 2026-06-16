document.addEventListener("DOMContentLoaded", () => {
    inicializarControlesInterfaz();
    inicializarEventosTrabajadores();
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

function inicializarEventosTrabajadores() {
    const btnRegistrar = document.getElementById('btn-registrar-trabajador');

    if (btnRegistrar) {
        btnRegistrar.addEventListener('click', async (evento) => {
            evento.preventDefault();
            
            const textoOriginal = btnRegistrar.innerHTML;
            btnRegistrar.disabled = true;
            btnRegistrar.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Redirigiendo...';

            const exito = await ServicioTrabajadores.prepararRegistroNuevo();

            if (exito) {
                window.location.href = "./RegistrarTrabajador.html";
            } else {
                btnRegistrar.disabled = false;
                btnRegistrar.innerHTML = textoOriginal;
            }
        });
    }
}