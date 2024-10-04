const d = document;
const $form = d.querySelector("#register-form");
const $nameInput = d.querySelector("#name");
const $nameError = d.querySelector("#name-error");
const $emailInput = d.querySelector("#email");
const $emailError = d.querySelector("#email-error");
const $passwordInput = d.querySelector("#password");
const $passwordError = d.querySelector("#password-error");
const $confirmPasswordInput = d.querySelector("#confirm-password");
const $confirmPasswordError = d.querySelector("#confirm-password-error");
const $successMessage = d.querySelector("#success-message");
const $loader = d.querySelector("#loader");
const $errorsMessages = d.querySelectorAll(".error");

// Función de Validación del Formulario
function validateForm(e) {
  // Reiniciar mensajes de error y éxito
  $errorsMessages.forEach((el) => {
    el.innerText = "";
  });
  $successMessage.innerText = "";

  let isValid = true;

  // Validar Nombre (solo letras y espacios)
  let namePattern = /^[A-Za-zÀ-ÿ\s]+$/; // Acepta letras y espacios
  if ($nameInput.value.trim() === "") {
    $nameError.innerText = "El nombre es obligatorio";
    isValid = false;
  } else if (!namePattern.test($nameInput.value.trim())) {
    $nameError.innerText = "El nombre solo debe contener letras y espacios";
    isValid = false;
  }

  // Validar correo
  let emailPattern = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  if ($emailInput.value.trim() === "") {
    $emailError.innerText = "El email es obligatorio";
    isValid = false;
  } else if (!emailPattern.test($emailInput.value.trim())) {
    $emailError.innerText = "El formato del correo no es válido";
    isValid = false;
  }

  // Validar Contraseña
  let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // Al menos una minúscula, una mayúscula, un número y un carácter especial
  if ($passwordInput.value.trim() === "") {
    $passwordError.innerText = "La contraseña es obligatoria";
    isValid = false;
  } else if (!passwordPattern.test($passwordInput.value.trim())) {
    $passwordError.innerText = "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula, un número y un carácter especial.";
    isValid = false;
  }

  // Validar Confirmar Contraseña
  if ($confirmPasswordInput.value.trim() !== $passwordInput.value.trim()) {
    $confirmPasswordError.innerText = "Las contraseñas no coinciden";
    isValid = false;
  }

  if (!isValid) {
    // Prevenir el envío del formulario si hay errores
    e.preventDefault();
  } else {
    e.preventDefault();
    $loader.style.display = "block";

    setTimeout(() => {
      $loader.style.display = "none";
      $successMessage.innerText = "Formulario enviado exitosamente.";
      $form.reset();
    }, 5000);
  }
}

$form.addEventListener("submit", validateForm);
