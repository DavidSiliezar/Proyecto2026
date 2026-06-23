document.addEventListener("DOMContentLoaded", () => {
    inicializarControlesInterfaz();
    inicializarEventosFormulario();
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

function inicializarEventosFormulario() {
    const btnGuardar = document.getElementById('btnGuardar');
    const capaExito = document.getElementById('capa-exito');
    const formulario = document.getElementById('formularioRegistro');

    if (btnGuardar && capaExito && formulario) {
        btnGuardar.addEventListener('click', async () => {
            if (formulario.checkValidity()) {
                
                const textoOriginal = btnGuardar.innerHTML;
                btnGuardar.disabled = true;
                btnGuardar.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Registrando...';

                const respuesta = await ServicioRegistrarTrabajador.registrar({});
                
                if (respuesta.exito) {
                    capaExito.classList.remove('d-none');
                }
                
                btnGuardar.disabled = false;
                btnGuardar.innerHTML = textoOriginal;
                formulario.reset();

            } else {
                formulario.reportValidity();
            }
        });
    }
}