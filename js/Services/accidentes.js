const ServicioAccidentes = {
    async obtenerAccidentes() {
        return [
            {
                vehiculo: "Toyota Hilux 2024",
                placa: "P 12 - 455",
                fecha: "10 Sep 2026 - 08:45",
                conductor: "Carlos Lopez",
                gravedad: "Moderado",
                aseguradora: "ASESUISA",
                poliza: "POL-7721",
                estado: "En Proceso"
            },
            {
                vehiculo: "Nissan Frontier 2023",
                placa: "P 14 - 1BA",
                fecha: "11 Sep 2026 - 13:15",
                conductor: "Juan Castro",
                gravedad: "Leve",
                aseguradora: "MAPFRE",
                poliza: "POL-3490",
                estado: "Resuelto"
            },
            {
                vehiculo: "Toyota Hilux 2024",
                placa: "P 12 - 455",
                fecha: "15 Sep 2026 - 17:20",
                conductor: "Rudy Pineda",
                gravedad: "Grave",
                aseguradora: "ASESUISA",
                poliza: "POL-7812",
                estado: "En Proceso"
            }
        ];
    },

    async registrarAccidente(datosAccidente) {
        return new Promise((resolver, rechazar) => {
            setTimeout(() => {
                if (!datosAccidente.vehiculo || !datosAccidente.conductor || !datosAccidente.fecha) {
                    rechazar({ exitoso: false, mensaje: "Formulario incompleto." });
                } else {
                    resolver({ exitoso: true, mensaje: "Accidente registrado correctamente" });
                }
            }, 800);
        });
    }
};