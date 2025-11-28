<div id="book-add-modal" class="modal">
    <div class="modal-content">
        <span id="closeModal" class="btn">&times;</span>

        <h2>Nova Entrada</h2>

        <form id="addForm" enctype="multipart/form-data">
            <label for="imagem">Imagem da capa:</label>
            <input type="file" id="imagem" name="image" accept="image/*" required>

            <label for="titulo">Título:</label>
            <input type="text" id="titulo" name="title" required>

            <label for="autor">Autor:</label>
            <input type="text" id="autor" name="author" required>

            <label for="generos">Gêneros:</label>
            <div class="genre-container"></div>

            <button type="submit" class="btn">Salvar</button>
            <br><br>
        </form>
    </div>
</div>
