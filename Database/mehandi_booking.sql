CREATE DATABASE mehandi_booking;
USE mehandi_booking;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20)
);

CREATE TABLE services (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price INT,
    duration INT,
    description TEXT
);

CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    service_id BIGINT,
    booking_date DATE,
    time_slot VARCHAR(50),
    customer_name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    notes TEXT,
    FOREIGN KEY (service_id) REFERENCES services(id)
);

CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price INT,
    description TEXT,
    stock INT
);

CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    shipping_address TEXT,
    total_amount INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO services (id, name, price, duration, description) VALUES 
(1, 'Mehandi Design', 1500, 120, 'Intricate traditional henna artistry'),
(2, 'Makeup Application', 2500, 90, 'Professional bridal & party glam'),
(3, 'Saree Draping', 800, 30, 'Expert draping in regional styles'),
(4, 'Nail Art', 600, 60, 'Stunning bridal hand & foot designs'),
(5, 'Saree Pre-Plating', 500, 45, 'Ready-to-wear pre-stitched pleats');


SELECT * from services;
select * from orders;
select * from bookings;

SELECT * FROM bookings ORDER BY id DESC LIMIT 1;
SELECT * FROM orders ORDER BY id DESC LIMIT 1;

