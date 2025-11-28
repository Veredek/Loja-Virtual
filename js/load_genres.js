document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".genre-container");
    if (!container) return; // (Rollback)

    container.innerHTML = "<p>Carregando gêneros...</p>";

    fetch("http://localhost/livrex/api/get_genres.php")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar os gêneros.");
            }
            return response.json();
        })
        .then(genres => {
            // Clear container
            container.innerHTML = "";

            // (Rollback)
            if (!Array.isArray(genres) || genres.length === 0) {
                container.innerHTML = "<p>Nenhum gênero encontrado.</p>";
                return;
            }

            // Criar checkboxes dinamicamente
            genres.forEach(genre => {
                const div = document.createElement("div");
                div.classList.add("book-add__genre-item");

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = "genres[]";
                checkbox.value = genre.id;

                const label = document.createElement("label");
                label.textContent = genre.string;

                div.appendChild(checkbox);
                div.appendChild(label);

                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error("Erro:", error);
            container.innerHTML = "<p>Erro ao carregar gêneros.</p>";
        });
});
