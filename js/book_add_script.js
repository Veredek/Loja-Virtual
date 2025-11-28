document.getElementById("addForm").addEventListener("submit", function(e) {
    console.log("salvando livro")
    e.preventDefault();

    let formData = new FormData(this);

    fetch("api/book_add_backend.php", {
        method: "POST",
        body: formData
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            alert("Livro cadastrado com sucesso!");
            location.reload();
        } else {
            alert("Erro ao cadastrar o livro!");
        }
    });
});
