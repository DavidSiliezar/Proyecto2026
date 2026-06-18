document.addEventListener("DOMContentLoaded", async () => {
    inicializarControlesInterfaz();
    await renderizarCargas();
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

async function renderizarCargas() {
    const contenedor = document.getElementById('lista-cargas');
    const cargas = await ServicioCombustible.obtenerCargasRecientes();

    let htmlContenido = '';

    cargas.forEach(carga => {
        htmlContenido += `
            <article class="tarjeta-carga">
                <div class="icono-gas">
                    <i class="fa-solid fa-gas-pump"></i>
                </div>
                
                <div class="columna-vehiculo">
                    <div class="texto-vehiculo">${carga.vehiculo}</div>
                    <div class="detalle-item">
                        <i class="fa-regular fa-circle-user"></i> ${carga.conductor}
                    </div>
                    <div class="detalle-item">
                        <i class="fa-solid fa-id-card"></i> ${carga.placa}
                    </div>
                </div>

                <div class="columna-fecha">
                    <div class="detalle-item" style="margin-top: 25px;">
                        <i class="fa-regular fa-calendar"></i> ${carga.fecha}
                    </div>
                    <div class="detalle-item">
                        <i class="fa-solid fa-droplet"></i> ${carga.litros}
                    </div>
                </div>

                <div class="columna-precio">
                    <span class="texto-precio">${carga.costo}</span>
                </div>
            </article>
        `;
    });

    contenedor.innerHTML = htmlContenido;
}