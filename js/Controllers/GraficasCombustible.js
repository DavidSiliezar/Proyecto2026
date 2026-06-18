document.addEventListener("DOMContentLoaded", async () => {
    inicializarControlesInterfaz();
    await renderizarGraficaCombustible();
});

function inicializarControlesInterfaz() {
    const btnMovil = document.getElementById('btn-menu-movil');
    const btnEscritorio = document.querySelector('.interruptor-menu');
    const barraLateral = document.getElementById('barra-lateral');

    if (barraLateral) {
        if (btnMovil) {
            btnMovil.addEventListener('click', () => {
                barraLateral.classList.toggle('mostrar');
            });
        }
        
        if (btnEscritorio) {
            btnEscritorio.addEventListener('click', () => {
                barraLateral.classList.toggle('colapsado');
            });
        }
    }
}

async function renderizarGraficaCombustible() {
    const canvas = document.getElementById('graficoCombustible');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const datos = await ServicioGraficasCombustible.obtenerDatosGrafica();

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: datos.etiquetas,
            datasets: [
                {
                    data: datos.serieClara,
                    backgroundColor: '#3b82f6',
                    barPercentage: 0.5,
                    categoryPercentage: 0.5,
                    borderRadius: 2
                },
                {
                    data: datos.serieOscura,
                    backgroundColor: '#1e293b',
                    barPercentage: 0.5,
                    categoryPercentage: 0.5,
                    borderRadius: 2
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
                    max: 4200,
                    ticks: {
                        callback: function(value) {
                            if (value === 0) return '$0';
                            if (value === 500) return '$500';
                            if (value === 1000) return '$1,000';
                            if (value === 2000) return '$2,000';
                            if (value === 3000) return '$3,000';
                            if (value === 4000) return '$4,000';
                            return null;
                        },
                        font: {
                            family: "'Inter', sans-serif",
                            size: 11
                        },
                        color: '#6b7280'
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false,
                    },
                    border: {
                        display: true,
                        color: '#333',
                        width: 1.5
                    },
                    ticks: {
                        font: {
                            family: "'Inter', sans-serif",
                            size: 10
                        },
                        color: '#6b7280'
                    }
                }
            }
        }
    });
}