document.addEventListener("DOMContentLoaded", () => {
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
            window.location.href = "./pages/Dashboard.html";
        } else {
            botonSubmit.disabled = false;
            botonSubmit.innerHTML = "Iniciar Sesión";
            formulario.classList.add("was-validated");
        }
    });
});