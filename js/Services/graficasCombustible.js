const ServicioGraficasCombustible = {
    async obtenerDatosGrafica() {
        return {
            etiquetas: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agostp', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            serieClara: [3550, 450, 450, 150, 50, 50, 3600, 3600, 3600, 650, 550, 650],
            serieOscura: [900, 2000, 450, 150, 50, 0, 950, 950, 950, 100, 3250, 650]
        };
    }
};