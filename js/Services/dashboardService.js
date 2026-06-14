
const DashboardService = {
    
    async getGastosData() {
        try {
            return {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                choques: [3500, 500, 500, 200, 100, 100, 3500, 3500, 3500, 700, 700, 700],
                averias: [1000, 2100, 500, 200, 100, 100, 1100, 1100, 1100, 200, 3200, 700]
            };
        } catch (error) {
            console.error("Error al obtener los datos de la flota:", error);
            return null;
        }
    }
};