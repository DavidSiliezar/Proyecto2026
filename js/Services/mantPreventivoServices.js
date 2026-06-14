const ServicioMantenimiento = {
    async registrarMantenimiento() {
        try {
            return new Promise(resolver => {
                setTimeout(() => {
                    resolver({ estado: 'exito', mensaje: 'Registro guardado correctamente' });
                }, 800); 
            });
        } catch (error) {
            console.error("Error en el servicio:", error);
            throw error; 
        }
    }
};