document.addEventListener("DOMContentLoaded", () => {
    
    // Activar el item correspondiente en la Sidebar
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuItems = document.querySelectorAll('.barra-lateral a');
    
    menuItems.forEach(item => {
        item.classList.remove('activo'); // Limpiar previos por si acaso
        const itemHref = item.getAttribute('href');
        if (itemHref && itemHref.includes(currentPage)) {
            item.classList.add('activo');
            // Si es un sub-menu, abrir su contenedor padre
            const collapseParent = item.closest('.collapse');
            if (collapseParent) {
                collapseParent.classList.add('show');
                const trigger = document.querySelector(`[aria-controls="${collapseParent.id}"]`);
                if (trigger) {
                    trigger.setAttribute('aria-expanded', 'true');
                }
            } else {
                // Si el item activo es el padre (ej. Mantenimiento), abrir su submenu hermano
                const nextEl = item.nextElementSibling;
                if (nextEl && nextEl.classList.contains('collapse')) {
                    nextEl.classList.add('show');
                    item.setAttribute('aria-expanded', 'true');
                }
            }
        }
    });
    
    // Función para manejar exportaciones
    const handleExport = (formato = 'csv') => {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Generando Reporte...',
                html: 'Preparando los datos, por favor espera.',
                timer: 1500,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                }
            }).then(() => {
                const csvContent = "data:text/csv;charset=utf-8,ID,Dato,Estado\\n1,Ejemplo,Activo\\n2,Prueba,Inactivo";
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", `Reporte_Exportado_${new Date().toISOString().split('T')[0]}.${formato}`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                Swal.fire('¡Éxito!', 'El reporte se ha descargado correctamente.', 'success');
            });
        }
    };

    // Función para manejar guardados / nuevos registros
    const handleSave = (mensaje = 'La acción se completó exitosamente.') => {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Procesando...',
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => Swal.showLoading()
            }).then(() => {
                Swal.fire('¡Completado!', mensaje, 'success').then(() => {
                    const modals = document.querySelectorAll('.modal.show');
                    modals.forEach(modal => {
                        // eslint-disable-next-line no-undef
                        const bootstrapModal = bootstrap.Modal.getInstance(modal);
                        if (bootstrapModal) bootstrapModal.hide();
                    });
                });
            });
        }
    };

    // Delegación de eventos a nivel global
    document.addEventListener("click", (e) => {
        // Ignorar clicks si provienen de SweetAlert (evitar conflictos)
        if (e.target.closest('.swal2-container')) return;

        const target = e.target.closest('button') || e.target.closest('a.btn') || (e.target.tagName === 'A' ? e.target : null);
        if (!target) return;

        const text = (target.innerText || '').trim().toLowerCase();
        const classes = (target.className || '').toLowerCase();
        const href = target.getAttribute('href');
        const id = target.id || '';

        // Manejar Cerrar Sesión
        if (text.includes('cerrar sesión') || text.includes('cerrar sesion') || id === 'btn-cerrar-sesion') {
            e.preventDefault();
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: '¿Cerrar Sesión?',
                    text: "Saldrás de tu cuenta de forma segura.",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, salir',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '../index.html';
                    }
                });
            } else {
                window.location.href = '../index.html';
            }
            return;
        }

        // Si es un enlace real a otra vista local, interceptarlo para hacer animación
        if (target.tagName === 'A' && href && href !== '#' && !href.startsWith('javascript:') && !target.hasAttribute('data-bs-toggle')) {
            return; 
        }

        // Ignorar botones de cerrar menú o modales
        if (classes.includes('btn-close') || classes.includes('btn-cerrar') || classes.includes('interruptor-movil') || classes.includes('interruptor-menu')) return;
        if (id === 'btnGuardar') return; // btnGuardar (Registrar Trabajador) ya tiene su propia logica avanzada
        if (id === 'btn-submit') return; // Login submit
        if (target.getAttribute('data-bs-toggle') === 'modal') return; // Abre modal, dejamos que bootstrap actue
        if (target.getAttribute('data-bs-dismiss') === 'modal') return; // Cierra modal
        if (text === 'reporte' && window.location.pathname.includes('Dashboard.html')) return; // Ya manejado en Dashboard
        if (target.onclick) return; // Si tiene funcionalidad en línea, respetarla

        // Botones de Exportar
        if (text.includes('exportar') || text.includes('descargar') || classes.includes('exportar')) {
            e.preventDefault();
            handleExport();
            return;
        }

        // Botones de Guardar, Registrar o Aceptar
        if (text.includes('guardar') || text.includes('registrar') || text.includes('aceptar') || text.includes('reportar') || classes.includes('btn-enviar')) {
            
            // Validar formularios nativamente primero
            const form = target.closest('form');
            if (form) {
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }
                e.preventDefault();
            } else if (target.tagName !== 'BUTTON' && target.tagName !== 'A' && target.type !== 'submit') {
                return;
            }

            e.preventDefault();
            handleSave('Registro guardado exitosamente.');
            return;
        }
        
        // Botones de Actualizar / Configurar / Marcar
        if (text.includes('actualizar') || text.includes('configurar') || text.includes('marcar como atendido') || text.includes('filtrar') || id === 'btn-limpiar-filtros') {
             e.preventDefault();
             let msg = 'Operación realizada con éxito.';
             if (text.includes('filtrar')) msg = 'Filtros aplicados a los resultados.';
             if (id === 'btn-limpiar-filtros') msg = 'Filtros limpiados.';
             handleSave(msg);
             return;
        }

        // Acciones de Tabla: Eliminar
        if (classes.includes('eliminar') || target.querySelector('.fa-trash') || text.includes('eliminar') || classes.includes('btn-outline-danger')) {
            e.preventDefault();
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: '¿Confirmar Eliminación?',
                    text: "Esta acción borrará el registro de forma permanente.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire('¡Eliminado!', 'El registro ha sido eliminado exitosamente.', 'success');
                    }
                });
            }
            return;
        }

        // Acciones de Tabla: Editar
        if (classes.includes('editar') || target.querySelector('.fa-pen') || text.includes('editar')) {
            e.preventDefault();
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Modo Edición Habilitado',
                    text: 'Puedes proceder a actualizar los datos correspondientes.',
                    icon: 'info',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Entendido'
                });
            }
            return;
        }
        
        // Acciones de Tabla: Ver Detalles
        if (classes.includes('ver') || target.querySelector('.fa-eye') || text.includes('ver detalles')) {
             e.preventDefault();
             if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Detalles Completos',
                    html: '<p class="text-muted">Aquí se desplegará la ficha completa con toda la información técnica del registro seleccionado.</p>',
                    icon: 'info',
                    confirmButtonText: 'Cerrar'
                });
             }
             return;
        }
    });
});
