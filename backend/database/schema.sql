CREATE DATABASE sistema_tickets;

USE sistema_tickets;

-- TODO: Agregar UNIQUE a email y rut
CREATE TABLE
    user (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        rut VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password char(60) NOT NULL
    );

CREATE TABLE
    client (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        rut VARCHAR(255) NOT NULL,
        companyRut VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password char(60) NOT NULL
    );