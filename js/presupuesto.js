document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("submitForm");
    submitForm.addEventListener("click", (e) => {
 
    // Obtención de los valores de los campos del formulario
    let nombre = document.getElementById("nombre").value.trim();
    let apellidos = document.getElementById("apellidos").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let email = document.getElementById("email").value.trim();
    let terms = document.getElementById("condiciones")


    let mensajeError = ""; // Variable para almacenar mensajes de error

    // Validación del nombre: Solo letras y máximo 15 caracteres
    let regexNombre = /^[a-zA-Z\s]+$/;
    if (!regexNombre.test(nombre) || nombre.length > 15) {
      mensajeError +=
        "El nombre solo puede contener letras y debe tener un máximo de 15 caracteres.<br>";
    }

    // Validación de los apellidos: Solo letras y máximo 40 caracteres
    let regexApellidos = /^[a-zA-Z\s]+$/;
    if (!regexApellidos.test(apellidos) || apellidos.length > 40) {
      mensajeError +=
        "Los apellidos solo pueden contener letras y deben tener un máximo de 40 caracteres.<br>";
    }

    // Validación del teléfono: Solo números y exactamente 9 dígitos
    let regexTelefono = /^[0-9]{9}$/;
    if (!regexTelefono.test(telefono)) {
      mensajeError +=
        "El teléfono debe contener exactamente 9 dígitos numéricos.<br>";
    }

    // Validación del correo electrónico: Formato estándar
    let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(email)) {
      mensajeError +=
        "El correo electrónico no es válido. Ejemplo válido: usuario@dominio.com<br>";
    }

    if (!terms.checked) {
            mensajeError +=
            "Debes aceptar los terminos y condiciones.<br>";
    }
   
    document.getElementById("mensaje-success").innerHTML = "";
        document.getElementById("mensaje-error").innerHTML = "";
    // Si hay errores mostrar mensajes y cancelar envio
    if (mensajeError) {
      document.getElementById("mensaje-error").innerHTML = mensajeError;
      return; // Evita que se envíe el formulario
    } else {
      document.getElementById("mensaje-success").innerHTML = "Datos enviados correctamente";
      document.getElementById("presupuestoForm").reset();
      return ; // Permite el envío si no hay errores
    }
  });
  const productoSelect = document.getElementById("producto");
  const plazoInput = document.getElementById("plazo");
  const extrasCheckboxes = document.querySelectorAll('input[class="input-extra"]');
  const presupuestoTotal = document.getElementById("presupuestoTotal");
  const calculateTotal = () => {
    let total = parseFloat(productoSelect.value);

    // Plazo: si el plazo es mayor a 30 días, aplicamos un descuento
    const plazo = parseInt(plazoInput.value);
    if (plazo > 30) {
      total -= total * 0.1; // 10% de descuento
    }

    // Añadir extras
    extrasCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        total += parseFloat(checkbox.value);
      }
    });

    // Actualizar presupuesto total
    presupuestoTotal.textContent = `${total.toFixed(2)}€`;
  };

  // Escuchar cambios en los campos del formulario
  productoSelect.addEventListener("change", calculateTotal);
  plazoInput.addEventListener("input", calculateTotal);
  extrasCheckboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", calculateTotal)
  );

  // Calcular total inicial
  calculateTotal();
});
