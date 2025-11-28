<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Livrex - SAC</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/tema.js" defer></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Eagle+Lake&display=swap" rel="stylesheet">
</head>
<body>
    <?php include 'includes\header.php'; ?>
    <?php include 'includes\nav.php'; ?>

    <main>
        <div class="container container--sac">
            <h1>Entre em contato</h1>
            <br>
            <form id="sac-form">
                <div>
                    <label for="nome">Nome</label>
                    <input type="text" name="nome" required>
                </div>

                <div>
                    <label for="email" id="label-email">E-mail</label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div>
                    <label for="cpf" id="label-cpf">CPF</label>
                    <input type="text" id="cpf" name="cpf" maxlength="14" required>
                </div>

                <div>
                    <label for="assunto">Assunto</label>
                    <input type="text" name="assunto" required>
                </div>

                <div>
                    <label for="mensagem">Mensagem</label>
                    <textarea name="mensagem" rows="5" required></textarea>
                </div>

                <div>
                    <button type="submit" class="btn">
                        <span>Enviar</span>
                    </button>
                </div>
            </form>
        </div>
    </main>

    <?php include 'includes\footer.php'?>

    <script src="js/validacao.js"></script>
</body>
</html>
