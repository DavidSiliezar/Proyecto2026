const ServicioCombustible = {
    async obtenerRegistrosCombustible() {
        return [
            {
                matricula: "P 213-122",
                vehiculo: "Toyota Hilux",
                fecha: "25 Oct 2023",
                conductor: "Juan Pérez",
                tipo: "Diésel",
                galones: 15.5,
                costoGalon: 4.50,
                total: 69.75,
                kilometraje: "45,200 Km",
                recibo: "REC-7781"
            },
            {
                matricula: "P 445-890",
                vehiculo: "Nissan Navara",
                fecha: "24 Oct 2023",
                conductor: "Pedro Gómez",
                tipo: "Diésel",
                galones: 12.0,
                costoGalon: 4.50,
                total: 54.00,
                kilometraje: "62,100 Km",
                recibo: "REC-7780"
            },
            {
                matricula: "C 112-909",
                vehiculo: "Ford Ranger",
                fecha: "23 Oct 2023",
                conductor: "Carlos Ruiz",
                tipo: "Gasolina",
                galones: 10.0,
                costoGalon: 4.80,
                total: 48.00,
                kilometraje: "33,500 Km",
                recibo: "REC-7779"
            }
        ];
    }
};