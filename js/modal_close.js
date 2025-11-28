// Fecha com X
document.getElementById("closeModal").onclick = () => {
    document.getElementById("book-add-modal").style.display = "none";
};

// Fecha clicando fora
window.onclick = function(e) {
    if (e.target === document.getElementById("book-add-modal")) {
        document.getElementById("book-add-modal").style.display = "none";
    }
};