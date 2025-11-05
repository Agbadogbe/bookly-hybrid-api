-- ============================================================
-- SCRIPT D'INITIALISATION DE LA BASE SQL : bookly_sql
-- ============================================================

-- 1️⃣ Crée la base de données (si elle n’existe pas déjà)
CREATE DATABASE bookly_sql;

-- 2️⃣ Passe sur cette base
\c bookly_sql;

-- 3️⃣ Création de la table "users"
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL
);

-- 4️⃣ Création de la table "books"
DROP TABLE IF EXISTS books CASCADE;
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  author VARCHAR(100) NOT NULL,
  available BOOLEAN DEFAULT TRUE
);

-- 5️⃣ (Optionnel) Quelques données de test
INSERT INTO users (name, email) VALUES
('Alice Dupont', 'alice@mail.com'),
('Bob Martin', 'bob@mail.com'),
('Chloé Leroy', 'chloe@mail.com');

INSERT INTO books (title, author, available) VALUES
('Le Petit Prince', 'Antoine de Saint-Exupéry', true),
('Les Misérables', 'Victor Hugo', true),
('1984', 'George Orwell', false);

-- 6️⃣ Vérification rapide
SELECT * FROM users;
SELECT * FROM books;
