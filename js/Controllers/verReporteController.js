document.addEventListener("DOMContentLoaded", async () => {
    inicializarControlesInterfaz();
    await cargarDetallesReporte();
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
    }
}

async function cargarDetallesReporte() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get('id');
        
        const reportes = await ServicioReportes.obtenerReportes();
        let reporte = null;

        if (idParam) {
            reporte = reportes.find(r => r.id === idParam);
        } else {
            // Si no hay id, cargar el primero por defecto para simular la vista
            reporte = reportes[0];
        }

        if (reporte) {
            document.getElementById('info-id').innerHTML = `<i class="fa-solid fa-file-invoice text-primary me-2"></i>Reporte #${reporte.id}`;
            document.getElementById('titulo-reporte').innerText = `Reporte #${reporte.id}`;
            document.getElementById('info-fecha').innerHTML = `<i class="fa-regular fa-calendar me-1"></i> ${reporte.fecha}`;
            
            const badge = document.getElementById('info-estado');
            if(reporte.estado === 'revision') {
                badge.className = 'badge bg-warning text-dark px-3 py-2 rounded-pill fs-6 shadow-sm';
                badge.innerText = 'En revisión';
                document.getElementById('btn-marcar-atendido').style.display = 'flex';
            } else {
                badge.className = 'badge bg-success text-white px-3 py-2 rounded-pill fs-6 shadow-sm';
                badge.innerText = 'Atendido';
                document.getElementById('btn-marcar-atendido').style.display = 'none';
            }

            document.getElementById('info-ubicacion').innerText = reporte.ubicacion;
            document.getElementById('info-imagen').src = reporte.img || 'https://placehold.co/400x300/e2e8f0/475569?text=Sin+Foto';
            
            // Simular descripción (ya que no viene del backend mockeado actual)
            document.getElementById('info-descripcion').innerText = "El conductor reporta un problema leve durante la ruta en la ubicación indicada. Se adjunta evidencia fotográfica para su revisión por parte del equipo de mantenimiento. Se solicita dar seguimiento oportuno.";
        }
    } catch (error) {
        console.error("Error cargando detalles del reporte", error);
    }
}

window.marcarAtendido = function() {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: '¿Marcar como Atendido?',
            text: "El reporte pasará a estado resuelto.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2ecc71',
            cancelButtonColor: '#e74c3c',
            confirmButtonText: 'Sí, marcar',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'rounded-pill px-4',
                cancelButton: 'rounded-pill px-4'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '¡Actualizado!',
                    text: 'El reporte ha sido marcado como atendido con éxito.',
                    icon: 'success',
                    confirmButtonColor: '#0d6efd',
                    customClass: { confirmButton: 'rounded-pill px-4' }
                }).then(() => {
                    const badge = document.getElementById('info-estado');
                    badge.className = 'badge bg-success text-white px-3 py-2 rounded-pill fs-6 shadow-sm';
                    badge.innerText = 'Atendido';
                    document.getElementById('btn-marcar-atendido').style.display = 'none';
                });
            }
        });
    } else {
        alert("Reporte marcado como atendido");
    }
}
