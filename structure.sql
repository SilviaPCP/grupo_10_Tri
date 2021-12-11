DROP DATABASE IF EXISTS tStore_db;
CREATE DATABASE tStore_db;
USE tStore_db;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users(
user_id int AUTO_INCREMENT NOT NULL,
first_name char(50) NOT NULL, 
last_name char(50) NOT NULL,
email varchar(100) NOT NULL,
password varchar(100) NOT NULL, 
gender char(10) NOT NULL,
created_at date NOT NULL,
updated_at date NOT NULL,
PRIMARY KEY(user_id)
)engine = InnoDB;

DROP TABLE IF EXISTS Products;
CREATE TABLE Products(
product_id int AUTO_INCREMENT NOT NULL,
product_name char(50) NOT NULL,
price varchar(50) NOT NULL,
discount varchar(100),
category varchar(100) NOT NULL,
description text NOT NULL,
color varchar(100) NOT NULL,
size varchar(50) NOT NULL,
PRIMARY KEY(product_id)
)engine = InnoDB;

DROP TABLE IF EXISTS Categories;
CREATE TABLE Categories(
category_id int NOT NULL,
category_name varchar(100) NOT NULL,
PRIMARY KEY(category_id)
)engine = InnoDB;

DROP TABLE IF EXISTS Category_User;
CREATE TABLE Category_User(
category_user_id int NOT NULL,
user_id int NOT NULL,
category_id int NOT NULL,
PRIMARY KEY (category_user_id),
CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES Users(user_id),
CONSTRAINT category_id_fk FOREIGN KEY (category_id) REFERENCES Categories(category_id)
)engine = InnoDB;

DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders(
order_id int NOT NULL,
product_id int NOT NULL,
user_id int NOT NULL,
order_date date NOT NULL,
PRIMARY KEY (order_id),
CONSTRAINT product_id_fk FOREIGN KEY (product_id) REFERENCES Products(product_id),
CONSTRAINT user_id_fk2 FOREIGN KEY (user_id) REFERENCES Users(user_id)
)engine = InnoDB;
