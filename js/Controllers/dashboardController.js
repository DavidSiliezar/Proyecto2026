document.addEventListener("DOMContentLoaded", async () => {
    initUIControls();
    await initGastosChart();
});


function initUIControls() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const desktopBtn = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (sidebar) {
        if (mobileBtn) {
            mobileBtn.addEventListener('click', () => {
                sidebar.classList.toggle('show');
            });
        }
        
        if (desktopBtn) {
            desktopBtn.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
            });
        }
    } else {
        console.warn("Sidebar no encontrada en el DOM.");
    }
}


async function initGastosChart() {
    const canvasElement = document.getElementById('gastosChart');
    if (!canvasElement) {
        console.warn("Canvas 'gastosChart' no encontrado.");
        return;
    }

    const ctx = canvasElement.getContext('2d');
    
    const data = await DashboardService.getGastosData();

    if (!data) {
        console.error("No se pudieron cargar los datos para el gráfico.");
        return; 
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Choques',
                    data: data.choques,
                    backgroundColor: '#3f7bf5',
                    barPercentage: 0.6,
                    categoryPercentage: 0.4
                },
                {
                    label: 'Averías repentinas',
                    data: data.averias,
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