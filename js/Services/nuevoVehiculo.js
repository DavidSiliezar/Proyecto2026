const NuevoVehiculoService = {
    async registrar(entidadVehiculo) {
        try {
            return await new Promise((resolver, rechazar) => {
                setTimeout(() => {
                    if (!entidadVehiculo || !entidadVehiculo.matricula) {
                        rechazar(new Error("Datos de entidad no válidos"));
                    }
                    resolver({
                        codigo: 201,
                        estado: "exito",
                        mensaje: "Vehículo incorporado con éxito al sistema operacional de flotas."
                    });
                }, 1000);
            });
        } catch (error) {
            console.error("Error crítico localizado en NuevoVehiculoService:", error);
            throw error;
        }
    }
};