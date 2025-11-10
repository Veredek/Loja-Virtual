const emailInput = document.getElementById("email");
const emailLabel = document.getElementById("label-email");

const cpfInput = document.getElementById("cpf");
const cpfLabel = document.getElementById("label-cpf");

// CPF Mask
cpfInput.addEventListener("input", function () {
  let valor = cpfInput.value.replace(/\D/g, ""); // remove tudo que não é número
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  cpfInput.value = valor;
});

document.getElementById("sac-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o envio automático do formulário
  let validForm = true;

  // Email validation
  const email = emailInput.value.trim();
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  emailLabel.classList.remove("invalid-label");

  if (!regexEmail.test(email)) {
    emailLabel.textContent = "E-mail inválido";
    emailLabel.classList.add("invalid-label");
    validForm = false;
  }

  // CPF validation
  const cpf = cpfInput.value.trim();
  const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

  cpfLabel.classList.remove("invalid-label");

  if (!regexCpf.test(cpf)) {
    cpfLabel.textContent = "CPF inválido";
    cpfLabel.classList.add("invalid-label");
    validForm = false;
  }

  if (validForm) {
    alert("Mensagem enviada com sucesso!");
    // this.submit();  // (opcional) remove o comentário para enviar o formulário
  }
});

emailInput.addEventListener("focus", () => {
  emailLabel.textContent = "E-mail";
  emailLabel.classList.remove("invalid-label");
});

cpfInput.addEventListener("focus", () => {
  cpfLabel.textContent = "CPF";
  cpfLabel.classList.remove("invalid-label");
});
