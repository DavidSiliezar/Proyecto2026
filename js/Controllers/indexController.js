document.addEventListener("DOMContentLoaded", () => {
    // Remover la intro después de la animación
    const introElement = document.getElementById("intro-netflix");
    if (introElement) {
        setTimeout(() => {
            introElement.remove();
        }, 3200);
    }

    const formulario = document.getElementById("formulario-login");
    const entradaClave = document.getElementById("clave");
    const iconoAlternar = document.getElementById("alternar-clave");
    const botonSubmit = document.getElementById("btn-submit");

    iconoAlternar.addEventListener("click", () => {
        const esPassword = entradaClave.getAttribute("type") === "password";
        entradaClave.setAttribute("type", esPassword ? "text" : "password");
        iconoAlternar.classList.toggle("bi-eye");
        iconoAlternar.classList.toggle("bi-eye-slash");
    });

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.classList.add("was-validated");
            return;
        }

        const usuario = document.getElementById("usuario").value;
        const clave = entradaClave.value;

        botonSubmit.disabled = true;
        botonSubmit.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Ingresando...';

        const respuesta = await ServicioLogin.procesarAutenticacion(usuario, clave);

        if (respuesta.exito) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: '¡Bienvenido!',
                    text: 'Iniciando sesión en el panel de control...',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    allowOutsideClick: false
                }).then(() => {
                    window.location.href = "./pages/Dashboard.html";
                });
            } else {
                window.location.href = "./pages/Dashboard.html";
            }
        } else {
            botonSubmit.disabled = false;
            botonSubmit.innerHTML = "Iniciar Sesión";
            formulario.classList.add("was-validated");
        }
    });
});