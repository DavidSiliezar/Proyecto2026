document.addEventListener("DOMContentLoaded", () => {
    inicializarControlesInterfaz();
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
    const enlaceMantenimiento = document.getElementById('enlace-mantenimiento');

    if (submenuMantenimiento && enlaceMantenimiento) {
        const instanciaColapsoSubmenu = new bootstrap.Collapse(submenuMantenimiento, { toggle: false });
        
        if (btnFlechaDesplegable) {
            btnFlechaDesplegable.addEventListener('click', (evento) => {
                evento.preventDefault();
                evento.stopPropagation();
                if (submenuMantenimiento.classList.contains('show')) {
                    instanciaColapsoSubmenu.hide();
                } else {
                    instanciaColapsoSubmenu.show();
                }
            });
        }

        submenuMantenimiento.addEventListener('show.bs.collapse', () => {
            enlaceMantenimiento.setAttribute('aria-expanded', 'true');
        });

        submenuMantenimiento.addEventListener('hide.bs.collapse', () => {
            enlaceMantenimiento.setAttribute('aria-expanded', 'false');
        });
    }
    
    const botonesAccion = document.querySelectorAll('.boton-accion');
    botonesAccion.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            evento.stopPropagation();
        });
    });
}