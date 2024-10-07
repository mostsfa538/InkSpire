CREATE DATABASE IF NOT EXISTS inkspair;

USE inkspair;

CREATE TABLE IF NOT EXISTS user(
  id INT AUTO_INCREMENT PRIMARY KEY,
  f_name VARCHAR(255) NOT NULL,
  l_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS book(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    quantity INT NOT NULL
);

CREATE TABLE IF NOT EXISTS card(
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_book INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_book) REFERENCES books(id)
);

CREATE TABLE IF NOT EXISTS order(
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_book INT NOT NULL,
    total_price DECIMAL(5, 2) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    order_status enum('pending', 'delivering' ,'cancelled' ,'completed') NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_book) REFERENCES books(id)
);

CREATE TABLE IF NOT EXISTS review(
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_book INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 10),
    body TEXT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_book) REFERENCES books(id)
);

CREATE TABLE IF NOT EXISTS on_hold(
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    status enum('pending', 'cancelled', 'accepted') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id)
);
