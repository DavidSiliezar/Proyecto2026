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

const ServicioDashboard = {
    async obtenerDatosGastos() {
        return {
            etiquetas: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            choques: [3500, 500, 500, 200, 100, 100, 3500, 3500, 3500, 700, 700, 700],
            averias: [1000, 2100, 500, 200, 100, 100, 1100, 1100, 1100, 200, 3200, 700]
        };
    }
};