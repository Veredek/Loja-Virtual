-- DATABASE
DROP DATABASE IF EXISTS livrex_db;
CREATE DATABASE livrex_db
    CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;

USE livrex_db;

-- TABLES
CREATE TABLE genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    genre VARCHAR(100) NOT NULL
);

CREATE TABLE authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(100) NOT NULL
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image TEXT
);

CREATE TABLE book_genres (
    book_id INT NOT NULL,
    genre_id INT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

CREATE TABLE book_authors (
    book_id INT NOT NULL,
    author_id INT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

-- VALUES
INSERT INTO genres (genre) VALUES
('Romance'),
('Tecnologia'),
('Programação'),
('Autoajuda'),
('Psicologia'),
('Jogos'),
('Drama');

INSERT INTO authors (author) VALUES
('Graciliano Ramos'),
('Robert Cecil Martin'),
('Napoleon Hill'),
('Jane McGonigal'),
('Colleen Hoover');

INSERT INTO books (title, image) VALUES
('Vidas Secas', 'vidas_secas.jpg'),
('Clean Code', 'clean_code.jpg'),
('Mais Esperto Que o Diabo', 'mais_esperto_que_o_diabo.jpg'),
('Reality Is Broken', 'reality_is_broken.jpg'),
('É Assim Que Acaba', 'e_assim_que_acaba.jfif');

INSERT INTO book_genres (book_id, genre_id) VALUES
(1, 1),
(2, 2),
(2, 3),
(3, 4),
(4, 5),
(4, 6),
(5, 1),
(5, 7);

INSERT INTO book_authors (book_id, author_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);
