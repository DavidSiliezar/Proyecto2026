document.addEventListener("DOMContentLoaded", () => {
    inicializarControlesInterfaz();
    inicializarCalculosFormulario();
    inicializarCargaArchivo();
    inicializarEnvioFormulario();
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

function inicializarCalculosFormulario() {
    const inputGalones = document.getElementById('input-galones');
    const inputTotal = document.getElementById('input-total');
    const resumenCostoGalon = document.getElementById('resumen-costo-galon');
    const resumenGalones = document.getElementById('resumen-galones');
    const resumenTotal = document.getElementById('resumen-total');

    function recalcularResumen() {
        const galones = parseFloat(inputGalones.value) || 0;
        const total = parseFloat(inputTotal.value) || 0;

        resumenGalones.textContent = `${galones.toFixed(1)} Gal`;
        resumenTotal.textContent = `$${total.toFixed(2)}`;

        if (galones > 0 && total > 0) {
            const costoPorGalon = total / galones;
            resumenCostoGalon.textContent = `$${costoPorGalon.toFixed(2)}`;
        } else {
            resumenCostoGalon.textContent = "$0.00";
        }
    }

    if (inputGalones && inputTotal) {
        inputGalones.addEventListener('input', recalcularResumen);
        inputTotal.addEventListener('input', recalcularResumen);
    }
}

function inicializarCargaArchivo() {
    const contenedorArchivo = document.getElementById('contenedor-archivo');
    const inputArchivo = document.getElementById('input-archivo');
    const iconoCarga = document.getElementById('icono-carga');
    const textoCargaPrincipal = document.getElementById('texto-carga-principal');

    if (!contenedorArchivo || !inputArchivo) return;

    contenedorArchivo.addEventListener('click', () => {
        inputArchivo.click();
    });

    contenedorArchivo.addEventListener('dragover', (evento) => {
        evento.preventDefault();
        contenedorArchivo.classList.add('arrastrando');
    });

    contenedorArchivo.addEventListener('dragleave', () => {
        contenedorArchivo.classList.remove('arrastrando');
    });

    contenedorArchivo.addEventListener('drop', (evento) => {
        evento.preventDefault();
        contenedorArchivo.classList.remove('arrastrando');
        
        if (evento.dataTransfer.files.length > 0) {
            inputArchivo.files = evento.dataTransfer.files;
            actualizarInterfazArchivo(evento.dataTransfer.files[0]);
        }
    });

    inputArchivo.addEventListener('change', () => {
        if (inputArchivo.files.length > 0) {
            actualizarInterfazArchivo(inputArchivo.files[0]);
        }
    });

    function actualizarInterfazArchivo(archivo) {
        if (archivo.type.startsWith('image/')) {
            iconoCarga.className = 'fa-solid fa-circle-check fs-2 text-success mb-2';
            textoCargaPrincipal.textContent = `Archivo seleccionado: ${archivo.name}`;
        } else {
            iconoCarga.className = 'fa-solid fa-circle-exclamation fs-2 text-danger mb-2';
            textoCargaPrincipal.textContent = 'Formato no soportado. Suba una imagen.';
            inputArchivo.value = '';
        }
    }
}

function inicializarEnvioFormulario() {
    const formulario = document.getElementById('formulario-combustible');
    const btnGuardar = document.getElementById('btn-guardar');
    const alerta = document.getElementById('alerta-notificacion');

    if (!formulario) return;

    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        
        if (!formulario.checkValidity()) {
            evento.stopPropagation();
            formulario.classList.add('was-validated');
            return;
        }

        btnGuardar.disabled = true;
        btnGuardar.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Guardando...';

        const datos = {
            vehiculo: document.getElementById('select-vehiculo').value,
            conductor: document.getElementById('select-conductor').value,
            fecha: document.getElementById('input-fecha').value,
            tipoCombustible: document.getElementById('select-tipo').value,
            galones: parseFloat(document.getElementById('input-galones').value),
            total: parseFloat(document.getElementById('input-total').value),
            kilometraje: parseInt(document.getElementById('input-kilometraje').value, 10),
            recibo: document.getElementById('input-recibo').value,
            estacion: document.getElementById('input-estacion').value
        };

        try {
            const respuesta = await ServicioRegistroCombustible.guardarRegistroCombustible(datos);
            
            alerta.className = 'alert alert-success rounded-4 d-block';
            alerta.textContent = respuesta.mensaje;
            formulario.classList.remove('was-validated');
            formulario.reset();
            
            document.getElementById('resumen-costo-galon').textContent = "$0.00";
            document.getElementById('resumen-galones').textContent = "0.0 Gal";
            document.getElementById('resumen-total').textContent = "$0.00";
            document.getElementById('icono-carga').className = 'fa-solid fa-cloud-arrow-up fs-2 text-muted mb-2';
            document.getElementById('texto-carga-principal').textContent = 'Arrastra y suelta la imagen aquí o haz clic para buscar';

            window.scrollTo({ top: 0, behavior: 'smooth' });

            setTimeout(() => {
                window.location.href = './Combustible.html';
            }, 1500);

        } catch (error) {
            alerta.className = 'alert alert-danger rounded-4 d-block';
            alerta.textContent = error.mensaje || "Ocurrió un error inesperado.";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            btnGuardar.disabled = false;
            btnGuardar.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Guardar Carga';
        }
    });
}