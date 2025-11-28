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

// Converte array de gêneros em string
$genresString = implode(", ", $genres);

// Atualiza no banco
$sql = "UPDATE books
        SET title = ?, author = ?, genres = ?
        WHERE id = ?";

$stmt =
