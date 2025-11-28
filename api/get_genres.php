<?php
header("Content-Type: application/json");
require_once 'conexao.php';

$sql = "SELECT id, genre FROM genres ORDER BY genre ASC";
$result = $conn->query($sql);

$genres = [];
while ($row = $result->fetch_assoc()) {
    $genres[] = [
        "id" => $row["id"],
        "string" => $row["genre"]
    ];
}

echo json_encode($genres, JSON_UNESCAPED_UNICODE);
?>