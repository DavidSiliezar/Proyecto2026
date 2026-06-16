const ServicioRegistrarTrabajador = {
    async registrar(datos) {
        return new Promise((resolver) => {
            setTimeout(() => {
                resolver({ exito: true });
            }, 500);
        });
    }
};