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

window.descargarReporte = function(formato) {
    try {
        const modalElement = document.getElementById('modal-reporte');
        if (!modalElement) return;
        
        const modalBody = modalElement.querySelector('.modal-body');
        const modalHeader = modalElement.querySelector('.modal-header');
        
        if (modalBody) {
            if (modalHeader) modalHeader.style.display = 'none';
            modalBody.innerHTML = `
                <div class="text-center py-5">
                    <div class="text-success mb-3"><i class="fa-solid fa-circle-check" style="font-size: 5rem;"></i></div>
                    <h4 class="fw-bold text-dark mb-2">¡Reporte Generado!</h4>
                    <p class="text-muted mb-0">El reporte en formato <strong>${formato.toUpperCase()}</strong> se está descargando en su dispositivo.</p>
                </div>
            `;
        }

        const contenidoPrincipal = document.getElementById('contenido-principal');
        const fechaActual = new Date().toISOString().split('T')[0];
        const nombreArchivo = `Reporte_Flota_${fechaActual}`;

        if (formato === 'pdf') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.onload = () => {
                const opt = {
                    margin:       0.5,
                    filename:     `${nombreArchivo}.pdf`,
                    image:        { type: 'jpeg', quality: 0.98 },
                    html2canvas:  { scale: 2 },
                    jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' }
                };
                html2pdf().set(opt).from(contenidoPrincipal).save();
            };
            document.head.appendChild(script);
        } else if (formato === 'excel') {
            const csvContent = "data:text/csv;charset=utf-8,Indicador,Valor\\nTotal Vehículos,45\\nEn Mantenimiento,5\\nConsumo Mensual (Gal),1200";
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `${nombreArchivo}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (formato === 'word' || formato === 'web') {
            const tipoMime = formato === 'word' ? 'application/msword' : 'text/html';
            const extension = formato === 'word' ? 'doc' : 'html';
            const preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Reporte</title></head><body>";
            const postHtml = "</body></html>";
            const html = preHtml + contenidoPrincipal.innerHTML + postHtml;

            const blob = new Blob(['\ufeff', html], { type: tipoMime });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${nombreArchivo}.${extension}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        
        setTimeout(() => {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
            }
            setTimeout(() => {
                location.reload();
            }, 400);
        }, 3500);
    } catch (error) {
        console.error("Error al generar reporte", error);
    }
};