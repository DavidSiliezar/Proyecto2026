document.addEventListener("DOMContentLoaded", () => {
    const elementosDom = {
        formulario: document.getElementById("formulario-nuevo-vehiculo"),
        btnEnviar: document.getElementById("btn-enviar-registro"),
        capaExito: document.getElementById("capa-exito"),
        btnAceptarExito: document.getElementById("btn-aceptar-exito"),
        btnMenuMovil: document.getElementById("btn-menu-movil"),
        btnEscritorio: document.getElementById("btn-escritorio"),
        barraLateral: document.getElementById("barra-lateral"),
        btnExaminar: document.getElementById("btn-examinar"),
        inputArchivoFoto: document.getElementById("input-archivo-foto"),
        campos: {
            matricula: document.getElementById("txt-matricula"),
            marca: document.getElementById("txt-marca"),
            modelo: document.getElementById("txt-modelo"),
            anio: document.getElementById("num-anio"),
            kilometraje: document.getElementById("num-kilometraje"),
            vin: document.getElementById("txt-vin"),
            estado: document.getElementById("sel-estado"),
            conductor: document.getElementById("sel-conductor")
        }
    };

    const inicializarNavegacion = () => {
        if (elementosDom.btnMenuMovil) {
            elementosDom.btnMenuMovil.addEventListener("click", () => {
                elementosDom.barraLateral.classList.toggle("abierto");
            });
        }
        if (elementosDom.btnEscritorio) {
            elementosDom.btnEscritorio.addEventListener("click", () => {
                elementosDom.barraLateral.classList.toggle("contraido");
            });
        }
    };

    const inicializarCargaArchivos = () => {
        if (elementosDom.btnExaminar && elementosDom.inputArchivoFoto) {
            elementosDom.btnExaminar.addEventListener("click", () => {
                elementosDom.inputArchivoFoto.click();
            });
        }
    };

    const procesarEnvioFormulario = async (evento) => {
        evento.preventDefault();

        if (!elementosDom.formulario.checkValidity()) {
            evento.stopPropagation();
            elementosDom.formulario.classList.add("was-validated");
            return;
        }

        const payloadVehiculo = {
            matricula: elementosDom.campos.matricula.value.trim(),
            marca: elementosDom.campos.marca.value.trim(),
            modelo: elementosDom.campos.modelo.value.trim(),
            anio: parseInt(elementosDom.campos.anio.value, 10),
            kilometrajeInicial: parseInt(elementosDom.campos.kilometraje.value, 10),
            vin: elementosDom.campos.vin.value.trim(),
            estado: elementosDom.campos.estado.value,
            conductorAsignado: elementosDom.campos.conductor.value
        };

        try {
            alternarEstadoBoton(true);
            const respuesta = await NuevoVehiculoService.registrar(payloadVehiculo);
            if (respuesta && respuesta.estado === "exito") {
                elementosDom.capaExito.classList.remove("d-none");
            }
        } catch (error) {
            alert("No se pudo procesar el alta de la unidad. Verifique la información e intente de nuevo.");
        } finally {
            alternarEstadoBoton(false);
        }
    };

    const alternarEstadoBoton = (estaCargando) => {
        if (estaCargando) {
            elementosDom.btnEnviar.disabled = true;
            elementosDom.btnEnviar.textContent = "Registrando...";
        } else {
            elementosDom.btnEnviar.disabled = false;
            elementosDom.btnEnviar.textContent = "Registrar Vehículo";
        }
    };

    const restablecerFlujoOrigen = () => {
        elementosDom.capaExito.classList.add("d-none");
        elementosDom.formulario.reset();
        elementosDom.formulario.classList.remove("was-validated");
        window.location.href = "./Vehiculos.html";
    };

    const suscribirEventos = () => {
        if (elementosDom.formulario) {
            elementosDom.formulario.addEventListener("submit", procesarEnvioFormulario);
        }
        if (elementosDom.btnAceptarExito) {
            elementosDom.btnAceptarExito.addEventListener("click", restablecerFlujoOrigen);
        }
    };

    inicializarNavegacion();
    inicializarCargaArchivos();
    suscribirEventos();
});