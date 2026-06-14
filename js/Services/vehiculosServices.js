const ServicioVehiculos = {
    async registrarVehiculo() {
        try {
            return new Promise(resolver => {
                setTimeout(() => {
                    resolver({ estado: 'exito', mensaje: 'Vehículo guardado correctamente' });
                }, 800); 
            });
        } catch (error) {
            console.error("Error en el servicio al registrar vehículo:", error);
            throw error; 
        }
    }
};