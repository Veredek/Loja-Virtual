<?php
header("Content-Type: application/json");
require_once 'conexao.php';

// (Rollback): not POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["error" => "Método inválido"]);
    exit;
}

$titulo = trim($_POST["title"] ?? "");
$autor = trim($_POST["author"] ?? "");
$generos = $_POST["genres"] ?? []; // lista de ids
$imagem = $_FILES["image"] ?? null;

// --- salvar imagem ---
$ext = pathinfo($imagem["name"], PATHINFO_EXTENSION);
$novoNome = uniqid() . "." . $ext;
$caminhoFinal = "../assets/img/" . $novoNome;

move_uploaded_file($imagem["tmp_name"], $caminhoFinal);

// --- inserir livro ---
$sqlLivro = "INSERT INTO books (title, image) VALUES (?, ?)";
$stmtLivro = $conn->prepare($sqlLivro);
$stmtLivro->bind_param("ss", $titulo, $novoNome);
$stmtLivro->execute();

$book_id = $stmtLivro->insert_id;

// --- inserir gêneros ---
foreach ($generos as $genres_ids) {
    $sqlGeneros = "INSERT INTO book_genres (book_id, genre_id) VALUES (?, ?)";
    $stmtGeneros = $conn->prepare($sqlGeneros);
    $stmtGeneros->bind_param("ii", $book_id, $genres_ids);
    $stmtGeneros->execute();
}

// --- inserir autores ---
$sqlAutor = "SELECT id FROM authors WHERE author = ?";
$stmtAutor = $conn->prepare($sqlAutor);
$stmtAutor->bind_param("s", $autor);
$stmtAutor->execute();
$resultAutor = $stmtAutor->get_result();

if ($resultAutor->num_rows > 0) {
    $row = $resultAutor->fetch_assoc();
    $autor_id = $row["id"];
}

else {
    $sqlInsertAutor = "INSERT INTO authors (author) VALUES (?)";
    $stmtInsertAutor = $conn->prepare($sqlInsertAutor);
    $stmtInsertAutor->bind_param("s", $autor);
    $stmtInsertAutor->execute();

    $autor_id = $stmtInsertAutor->insert_id;
}

$sqlAutor2 = "INSERT INTO book_authors (book_id, author_id) VALUES (?, ?)";
$stmtAutor2 = $conn->prepare($sqlAutor2);
$stmtAutor2->bind_param("ii", $book_id, $autor_id);
$stmtAutor2->execute();

//
echo json_encode(["success" => true, "id" => $book_id]);
?>