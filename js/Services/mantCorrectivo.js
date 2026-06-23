const ServicioMantenimientoPreventivo = {
    async registrarMantenimiento(datos) {
        return new Promise((resolver) => {
            setTimeout(() => {
                resolver({ exito: true });
            }, 800);
        });
    }
};