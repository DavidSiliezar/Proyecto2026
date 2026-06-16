const ServicioLogin = {
    async procesarAutenticacion(usuario, clave) {
        return new Promise((resolver) => {
            setTimeout(() => {
                if (usuario.trim() !== '' && clave.trim() !== '') {
                    resolver({ exito: true });
                } else {
                    resolver({ exito: false });
                }
            }, 800);
        });
    }
};