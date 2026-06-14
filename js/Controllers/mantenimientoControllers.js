document.addEventListener("DOMContentLoaded", () => {
    inicializarControlesInterfaz();
    inicializarGraficos();
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
                
                
                const submenus = document.querySelectorAll('.collapse.show');
                submenus.forEach(submenu => {
                    const bsCollapse = new bootstrap.Collapse(submenu, { toggle: false });
                    bsCollapse.hide();
                });
            });
        }
    }
}

function inicializarGraficos() {
    
    const ctxTipos = document.getElementById('grafico-tipos-mantenimiento');
    if (ctxTipos) {
        new Chart(ctxTipos, {
            type: 'bar',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Preventivo',
                        data: [12, 19, 15, 22, 18, 25],
                        backgroundColor: '#3b82f6', // Azul principal
                        borderRadius: 4
                    },
                    {
                        label: 'Correctivo',
                        data: [5, 8, 4, 7, 5, 9],
                        backgroundColor: '#f87171', // Rojo suave
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } }
                },
                scales: {
                    y: { beginAtZero: true, grid: { borderDash: [4, 4] } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    
    const ctxCostos = document.getElementById('grafico-costos-mensuales');
    if (ctxCostos) {
        new Chart(ctxCostos, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Costo ($)',
                    data: [12000, 15000, 11000, 18000, 14000, 15450],
                    borderColor: '#8b5cf6', // Morado
                    backgroundColor: 'rgba(139, 92, 246, 0.1)', // Fondo semi-transparente
                    borderWidth: 3,
                    tension: 0.4, // Curva suave
                    fill: true,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#8b5cf6',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) { return '$ ' + context.raw.toLocaleString(); }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { borderDash: [4, 4] },
                        ticks: { callback: function(value) { return '$' + value / 1000 + 'k'; } }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }
}