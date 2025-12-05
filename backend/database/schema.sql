CREATE DATABASE IF NOT EXISTS ship_catalog 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE ship_catalog;

DROP TABLE IF EXISTS ships;

CREATE TABLE ships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tonnage INT NOT NULL,
    passengers INT NOT NULL,
    captain VARCHAR(255) NOT NULL,
    speed INT NOT NULL,
    mileage INT NOT NULL,
    description TEXT,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE INDEX idx_tonnage ON ships(tonnage);
CREATE INDEX idx_passengers ON ships(passengers);
CREATE INDEX idx_speed ON ships(speed);
CREATE INDEX idx_name ON ships(name);