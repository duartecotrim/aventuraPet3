CREATE DATABASE db_aventura_pet;

USE db_aventura_pet;

CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome_usuario VARCHAR(100), 
    tipo_usuario BOOLEAN
);

CREATE TABLE contato_usuario(
    id_contato_usuario INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    telefone VARCHAR(20),
    cep VARCHAR(8),
    email VARCHAR(100),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE password_hash(
    id_password_hash INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    password_hash VARCHAR(300),
    ativo BOOLEAN,
    data_criacao DATE,
    data_inativacao DATE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE pet_user(
    id_user_pet INT PRIMARY key AUTO_INCREMENT,
    id_usuario INT,   
    nome_pet VARCHAR(50),
    disponivel BOOLEAN,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE image_pet(
    id_imagem_pet INT PRIMARY KEY AUTO_INCREMENT,
    id_user_pet INT,
    imagem LONGBLOB,
    FOREIGN KEY (id_user_pet) REFERENCES pet_user(id_user_pet)
);
