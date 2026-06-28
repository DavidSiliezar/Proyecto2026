const ServicioRegistroCombustible = {
    async guardarRegistroCombustible(datosRegistro) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!datosRegistro.vehiculo || !datosRegistro.total || datosRegistro.total <= 0) {
                    reject({ exitoso: false, mensaje: "Datos de formulario inválidos o incompletos." });
                } else {
                    resolve({ exitoso: true, mensaje: "La carga de combustible ha sido registrada con éxito." });
                }
            }, 1000);
        });
    }
};