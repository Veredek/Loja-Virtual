<?php
header("Content-Type: application/json");
require_once "conexao.php";

// (Rollback): Method
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["error" => "Método inválido"]);
    exit;
}

// Recebe JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "JSON inválido"]);
    exit;
}

$id      = intval($data["id"] ?? 0);
$image   = $data["image"] ?? "";
$title   = trim($data["title"] ?? "");
$author  = trim($data["author"] ?? "");
$genres  = $data["genres"] ?? [];

// (Rollback): id
if ($id <= 0) {
    echo json_encode(["error" => "ID inválido"]);
    exit;
}

// (Rollback): title, author
if ($title === "" || $author === "") {
    echo json_encode(["error" => "Título e autor são obrigatórios"]);
    exit;
}

// --- DB UPDATE ---
// (Rollback): genre not find
foreach ($genres as $genre) {
    $genre = trim($genre);
    $sqlGenero = "SELECT id FROM genres WHERE genre = ?";
    $stmtGenero = $conn->prepare($sqlGenero);
    $stmtGenero->bind_param("s", $genre);
    $stmtGenero->execute();
    $resultGenero = $stmtGenero->get_result();

    if ($resultGenero->num_rows == 0) {
        echo json_encode(["error" => "Gênero inválido: " . $genre]);
        exit;
    }
}

// Check for new Author
$sqlAutor = "SELECT id FROM authors WHERE author = ?";
$stmtAutor = $conn->prepare($sqlAutor);
$stmtAutor->bind_param("s", $author);
$stmtAutor->execute();
$resultAutor = $stmtAutor->get_result();

if ($resultAutor->num_rows > 0) {
    $autor_id = $resultAutor->fetch_assoc()["id"];
} else {
    $sqlInsertAutor = "INSERT INTO authors (author) VALUES (?)";
    $stmtInsertAutor = $conn->prepare($sqlInsertAutor);
    $stmtInsertAutor->bind_param("s", $author);
    $stmtInsertAutor->execute();

    $autor_id = $stmtInsertAutor->insert_id;
}

// UPDATE
// books
$sql = "UPDATE books
        SET title = ?, image = ?
        WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $title, $image, $id);
$stmt->execute();

// book_authors
$conn->query("DELETE FROM book_authors WHERE book_id = $id");

$sqlInsAuth = "INSERT INTO book_authors (book_id, author_id) VALUES (?, ?)";
$stmtInsAuth = $conn->prepare($sqlInsAuth);
$stmtInsAuth->bind_param("ii", $id, $autor_id);
$stmtInsAuth->execute();

// book_genres
$conn->query("DELETE FROM book_genres WHERE book_id = $id");

foreach ($genres as $genre) {
    $sqlSlcGen = "SELECT id FROM genres WHERE genre = ?";
    $stmtSlcGen = $conn->prepare($sqlSlcGen);
    $stmtSlcGen->bind_param("s", $genre);
    $stmtSlcGen->execute();
    $row = $stmtSlcGen->get_result()->fetch_assoc();
    $genre_id = $row["id"];

    $sqlInsGen = "INSERT INTO book_genres (book_id, genre_id) VALUES (?, ?)";
    $stmtInsGen = $conn->prepare($sqlInsGen);
    $stmtInsGen->bind_param("ii", $id, $genre_id);
    $stmtInsGen->execute();
}

echo json_encode(["success" => true]);
exit;
?>