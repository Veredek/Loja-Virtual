<?php
header("Content-Type: application/json");

require "conexao.php";

$sql = "
    SELECT
        b.id,
        b.title,
        b.image,
        a.author,
        GROUP_CONCAT(g.genre SEPARATOR ',') AS genres
    FROM books b
    JOIN book_authors ba ON ba.book_id = b.id
    JOIN authors a ON a.id = ba.author_id
    JOIN book_genres bg ON bg.book_id = b.id
    JOIN genres g ON g.id = bg.genre_id
    GROUP BY b.id
";

$result = $conn->query($sql);

$books = [];

while($row = $result->fetch_assoc()){
    $row["genres"] = explode(",", $row["genres"]);
    $books[] = $row;
}

echo json_encode($books);
?>