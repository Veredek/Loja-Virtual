function excluirLivro(id) {
    fetch("http://localhost/livrex/api/delete_book.php", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: "id=" + id
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            alert("Livro excluído com sucesso!");
            location.reload();
        } else {
            alert("Erro ao excluir: " + data.error);
        }
    });
}

console.log("loading: carregadados.js");
document.addEventListener("DOMContentLoaded", function () {
  const tabela = document.querySelector("#catalogo tbody");

  fetch("http://localhost/livrex/api/get_books.php")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao acessar a API.");
      return response.json();
    })
    .then(livros => {
      // Clear table
      tabela.innerHTML = "";

      // Add + button
      const btnRow = document.createElement("tr");
      btnRow.innerHTML = `
        <td colspan="5">
          <button id="book-add-btn">+</button>
        </td>
      `;
      tabela.appendChild(btnRow);

      // Button Click Event
      btnRow.querySelector("#book-add-btn").addEventListener("click", () => {
        document.getElementById("book-add-modal").style.display = "flex";
      });

      // Show Books
      livros.forEach(livro => {
        const linha = document.createElement("tr");
        linha.dataset.id = livro.id;

        // Array de generos -> string
        const genresString = Array.isArray(livro.genres)
          ? livro.genres.join(", ")
          : "";

        linha.innerHTML = `
          <td><img src="assets/img/${livro.image}" alt="${livro.title}"></td>
          <td>${livro.title}</td>
          <td>${livro.author}</td>
          <td>${genresString}</td>
          <td class="catalogo__config">
            <div class="catalogo__config-wrapper">
              <button class="btn edit-btn">✏️</button>
              <button class="btn delete-btn">🗑️</button>
            </div>
          </td>

        `;

        tabela.appendChild(linha);
      });
    })
    .catch(error => {
      console.error("Erro:", error);
      tabela.innerHTML = `<tr><td colspan="5">Erro ao carregar os livros.</td></tr>`;
    });

  // --- ⚙️ CONFIG ---
  tabela.addEventListener("click", function (e) {
    const linha = e.target.closest("tr");
    if (!linha) return;
    const bookId = linha.dataset.id;
    const tds = linha.querySelectorAll("td");

    // --- ✏️ EDIT ---
    if (e.target.classList.contains("edit-btn")) {
      const img = tds[0].querySelector("img");

      linha.dataset.originalImage = img ? img.getAttribute("src").replace("assets/img/", "") : "";
      linha.dataset.originalTitle = tds[1].textContent;
      linha.dataset.originalAuthor = tds[2].textContent;
      linha.dataset.originalGenres = tds[3].textContent;

      tds[0].innerHTML = `<input type="file">`;
      tds[1].innerHTML = `<input type="text" value="${linha.dataset.originalTitle}">`;
      tds[2].innerHTML = `<input type="text" value="${linha.dataset.originalAuthor}">`;
      tds[3].innerHTML = `<input type="text" value="${linha.dataset.originalGenres}">`;


      tds[4].innerHTML = `
        <div class="catalogo__config-wrapper">
          <button class="btn save-btn">💾</button>
          <button class="btn cancel-btn">❌</button>
        </div>
      `;
    }

     // --- ❌ CANCEL ---
    if (e.target.classList.contains("cancel-btn")) {

      tds[0].innerHTML = `<img src="assets/img/${linha.dataset.originalImage}" alt="${linha.dataset.originalImage}">`;
      tds[1].textContent = linha.dataset.originalTitle;
      tds[2].textContent = linha.dataset.originalAuthor;
      tds[3].textContent = linha.dataset.originalGenres;

      tds[4].innerHTML = `
        <div class="catalogo__config-wrapper">
          <button class="btn edit-btn">✏️</button>
          <button class="btn delete-btn">🗑️</button>
        </div>
      `;
    }

    // --- 💾 SAVE ---
    if (e.target.classList.contains("save-btn")) {
      const inputs = linha.querySelectorAll("input");
      let data

      if ((inputs[0].files[0]) == undefined) {
        console.log("ok")
        data = {
          id: bookId,
          image: linha.dataset.originalImage,
          title: inputs[1].value,
          author: inputs[2].value,
          genres: inputs[3].value.split(",").map(g => g.trim())
        };
      } else {
        data = {
          id: bookId,
          image: inputs[0].files[0].name,
          title: inputs[1].value,
          author: inputs[2].value,
          genres: inputs[3].value.split(",").map(g => g.trim())
      }}

      fetch("http://localhost/livrex/api/update_book.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          // Atualizar visualmente os valores
          const tds = linha.querySelectorAll("td");

          tds[0].innerHTML = `<img src="assets/img/${data.image}" alt="${data.title}">`;
          tds[1].textContent = data.title;
          tds[2].textContent = data.author;
          tds[3].textContent = data.genres.join(", ");

          tds[4].innerHTML = `
            <button class="btn edit-btn">✏️</button>
            <button class="btn delete-btn">🗑️</button>
          `;
        } else {
          alert(res.error);
        }
        location.reload();
      });
    }

    // --- 🗑️ DELETE ---
    if (e.target.classList.contains("delete-btn")) {
      const id = e.target.dataset.id;

      if (confirm("Tem certeza que deseja excluir este livro?")) {
            excluirLivro(bookId);
        } else {
            return;
        }
    }
  });

});