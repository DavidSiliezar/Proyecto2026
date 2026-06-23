const ServicioTrabajadores = {
    async prepararRegistroNuevo() {
        return new Promise((resolver) => {
            setTimeout(() => {
                resolver(true);
            }, 500);
        });
    }
};