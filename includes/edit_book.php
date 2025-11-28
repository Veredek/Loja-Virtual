<div id="book-edit-modal" class="modal">
    <div class="modal-content">
        <span class="close" id="edit-close">&times;</span>

        <h2>Editar Livro</h2>

        <form id="book-edit-form">
            <input type="hidden" id="edit-id">

            <label for="edit-title">Título</label>
            <input type="text" id="edit-title" required>

            <label for="edit-author">Autor</label>
            <input type="text" id="edit-author" required>

            <label for="edit-genres">Gêneros (separados por vírgula)</label>
            <input type="text" id="edit-genres">

            <button type="submit" class="btn-save">Salvar Alterações</button>
        </form>
    </div>
</div>
