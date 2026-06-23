document.addEventListener("DOMContentLoaded", () => {
    inicializarControlesInterfaz();
    inicializarUploadArea();
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

function inicializarUploadArea() {
    const areaSubida = document.getElementById('area-subida');
    const inputFile = document.getElementById('input-file');
    const btnBrowse = document.getElementById('btn-browse');

    if (areaSubida && inputFile && btnBrowse) {
        btnBrowse.addEventListener('click', () => {
            inputFile.click();
        });

        areaSubida.addEventListener('dragover', (e) => {
            e.preventDefault();
            areaSubida.classList.add('dragover');
        });

        areaSubida.addEventListener('dragleave', (e) => {
            e.preventDefault();
            areaSubida.classList.remove('dragover');
        });

        areaSubida.addEventListener('drop', (e) => {
            e.preventDefault();
            areaSubida.classList.remove('dragover');
            
            if (e.dataTransfer.files.length > 0) {
                inputFile.files = e.dataTransfer.files;
                actualizarTextoSubida(inputFile.files[0].name);
            }
        });

        inputFile.addEventListener('change', () => {
            if (inputFile.files.length > 0) {
                actualizarTextoSubida(inputFile.files[0].name);
            }
        });
    }

    const formRegistro = document.getElementById('form-registro-mantenimiento');
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();
            window.history.back();
        });
    }
}

function actualizarTextoSubida(nombreArchivo) {
    const pTag = document.querySelector('#area-subida p.fw-semibold');
    if (pTag) {
        pTag.innerHTML = `Archivo seleccionado: <span class="text-primary">${nombreArchivo}</span>`;
    }
}