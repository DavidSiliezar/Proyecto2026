document.addEventListener("DOMContentLoaded", async () => {
    inicializarControlesInterfaz();
    await inicializarGraficoGastos();
});

function inicializarControlesInterfaz() {
    const btnMovil = document.getElementById('btn-menu-movil');
    const btnEscritorio = document.getElementById('btn-escritorio');
    const barraLateral = document.getElementById('barra-lateral');
    const contenidoPrincipal = document.getElementById('contenido-principal');

    if (barraLateral) {
        if (btnMovil) {
            btnMovil.addEventListener('click', () => {
                barraLateral.classList.toggle('mostrar');
            });
        }
        
        if (btnEscritorio) {
            btnEscritorio.addEventListener('click', () => {
                barraLateral.classList.toggle('colapsado');
                if (contenidoPrincipal) {
                    contenidoPrincipal.classList.toggle('expandida');
                }
            });
        }
    } else {
        console.warn("La barra lateral no se encontró en el DOM.");
    }
}

async function inicializarGraficoGastos() {
    const canvasElemento = document.getElementById('grafico-gastos');
    if (!canvasElemento) {
        console.warn("Canvas 'grafico-gastos' no encontrado en el DOM.");
        return;
    }

    const ctx = canvasElemento.getContext('2d');
    const datosGrafico = await ServicioDashboard.obtenerDatosGastos();

    if (!datosGrafico) {
        console.error("No se pudieron cargar los datos para el gráfico.");
        return; 
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: datosGrafico.etiquetas,
            datasets: [
                {
                    label: 'Choques',
                    data: datosGrafico.choques,
                    backgroundColor: '#3f7bf5',
                    barPercentage: 0.6,
                    categoryPercentage: 0.4
                },
                {
                    label: 'Averías repentinas',
                    data: datosGrafico.averias,
                    backgroundColor: '#1a2240',
                    barPercentage: 0.6,
                    categoryPercentage: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) { 
                            return '$' + context.raw.toLocaleString(); 
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) { return '$' + value.toLocaleString(); },
                        stepSize: 1000,
                        font: { size: 10 }
                    },
                    grid: { display: false, drawBorder: false }
                },
                x: {
                    grid: { display: false, drawBorder: true },
                    ticks: { font: { size: 10 } }
                }
            }
        }
    });
}