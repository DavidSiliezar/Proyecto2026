const ServicioAccidentes = {
    async registrarAccidente() {
        try {
            return new Promise(resolver => {
                // Simulación de guardado asíncrono
                setTimeout(() => {
                    resolver({ estado: 'exito', mensaje: 'Accidente registrado correctamente' });
                }, 800); 
            });
        } catch (error) {
            console.error("Error en el servicio al registrar accidente:", error);
            throw error; 
        }
    }
};