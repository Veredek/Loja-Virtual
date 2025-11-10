document.getElementById("sac-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o envio automático do formulário

  const emailInput = document.getElementById("email");
  const mensagemErro = document.getElementById("not-valid-email");
  const email = emailInput.value.trim();

  // Expressão regular para validar e-mails no formato correto
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!regexEmail.test(email)) {
    mensagemErro.textContent = "E-mail inválido";
    emailInput.classList.add("invalid");
  } else {
    mensagemErro.textContent = "";
    emailInput.style.border = "2px solid green";

    // Aqui você pode enviar o formulário normalmente, se desejar
    alert("E-mail válido! Formulário enviado com sucesso.");
    // this.submit();  // (opcional) remove o comentário para enviar o formulário
  }
});
