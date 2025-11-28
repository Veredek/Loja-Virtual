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
              <button class="btn edit-btn" data-id="${livro.id}">✏️</button>
              <button class="btn delete-btn" data-id="${livro.id}">🗑️</button>
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
    const bookId = linha.dataset.id;
    const tds = linha.querySelectorAll("td");
    const original = {
      image: tds[0].innerHTML,
      title: tds[1].textContent,
      author: tds[2].textContent,
      genres: tds[3].textContent
    };
    if (!linha) return;

    // --- ✏️ EDIT ---
    if (e.target.classList.contains("edit-btn")) {

      tds[0].innerHTML = `<input type="file">`;
      tds[1].innerHTML = `<input type="text" value="${original.title}">`;
      tds[2].innerHTML = `<input type="text" value="${original.author}">`;
      tds[3].innerHTML = `<input type="text" value="${original.genres}">`;

      tds[4].innerHTML = `
        <div class="catalogo__config-wrapper">
          <button class="btn save-btn">💾</button>
          <button class="btn cancel-btn">❌</button>
        </div>
      `;
    }

     // --- ❌ CANCEL ---
    if (e.target.classList.contains("cancel-btn")) {

      tds[0].innerHTML = original.image;
      tds[1].textContent = original.title;
      tds[2].textContent = original.author;
      tds[3].textContent = original.genres;

      tds[4].innerHTML = `
        <div class="catalogo__config-wrapper">
          <button class="btn edit-btn" data-id="${bookId}">✏️</button>
          <button class="btn delete-btn" data-id="${bookId}">🗑️</button>
        </div>
      `;
    }

    // --- 💾 SAVE ---
    if (e.target.classList.contains("save-btn")) {
      const inputs = linha.querySelectorAll("input");

      const data = {
        id: bookId,
        title: inputs[0].value,
        author: inputs[1].value,
        genres: inputs[2].value.split(",").map(g => g.trim())
      };

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

          tds[1].textContent = data.title;
          tds[2].textContent = data.author;
          tds[3].textContent = data.genres.join(", ");

          // Restaurar botões
          const wrapper = linha.querySelector(".catalogo__config-wrapper");
          wrapper.innerHTML = `
            <button class="btn edit-btn">✏️</button>
            <button class="btn delete-btn">🗑️</button>
          `;
        } else {
          alert("Erro ao atualizar!");
        }
      });
    }

    // --- 🗑️ DELETE ---
    if (e.target.classList.contains("delete-btn")) {
      console.log("Deletando livro de ID:", bookId);
      // Aqui você pode chamar API para deletar
    }
  });

});