<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Livrex</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/tema.js" defer></script>
</head>
<body>
    <?php include 'includes\header.php'; ?>
    <?php include 'includes\nav.php'; ?>

    <main>
        <div class="container">
            <h1>Catálogo</h1>

            <h2>Bem-vindo ao nosso catálogo!</h2>
            </h3>Aqui você encontrará uma seleção especial de livros de diversos gêneros para todos os gostos. Explore as obras disponíveis e descubra novas leituras incríveis.</h3>
            <br><br>

            <?php include "includes/book_add.php"?>

            <div class="catalogo__container">
                <table id="catalogo" class="catalogo">
                    <thead>
                        <tr>
                            <th>Imagem</th>
                            <th>Titulo</th>
                            <th>Autor</th>
                            <th>Generos</th>
                            <th>⚙️</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </main>

    <?php include "includes/footer.php"?>

    <script src="js/carrega_dados.js"></script>
    <script src="js/modal_close.js"></script>
    <script src="js/load_genres.js"></script>
    <script src="js/book_add_script.js"></script>
</body>
</html>
