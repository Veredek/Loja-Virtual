document.addEventListener("DOMContentLoaded", function() {
  const tabela = document.querySelector("#catalogo tbody");

  fetch("assets/dados.json")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar o arquivo JSON.");
      return response.json();
    })
    .then(livros => {
      tabela.innerHTML = "";

      livros.forEach(livro => {
        const linha = document.createElement("tr");

        // Transforma o array de gêneros em uma string separada por vírgulas
        const genresString = livro.genre.join(", ");

        linha.innerHTML = `
          <td><img src="${livro.image}" alt="${livro.title}"></td>
          <td>${livro.title}</td>
          <td>${livro.autor}</td>
          <td>${genresString}</td>
        `;

        tabela.appendChild(linha);
      });
    })
    .catch(error => {
      console.error("Erro:", error);
      tabela.innerHTML = `<tr><td colspan="4">Erro ao carregar os livros.</td></tr>`;
    });
});
