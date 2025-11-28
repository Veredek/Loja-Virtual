<?php
header("Content-Type: application/json");
require_once "conexao.php";

// Verificar método
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["error" => "Método inválido"]);
    exit;
}

// Receber ID
$id = intval($_POST["id"] ?? 0);

if ($id <= 0) {
    echo json_encode(["error" => "ID inválido"]);
    exit;
}

// Deletar o livro
$sql = "DELETE FROM books WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Erro ao deletar o livro"]);
}
?>
