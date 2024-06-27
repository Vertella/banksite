CREATE DATABASE bank_db;

USE bank_db;

CREATE TABLE users (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE accounts (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) DEFAULT 0.00
);

CREATE TABLE sessions (
  username VARCHAR(50),
  onetimepass VARCHAR(50),
  PRIMARY KEY (username, onetimepass)
);
