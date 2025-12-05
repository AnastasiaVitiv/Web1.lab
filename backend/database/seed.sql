USE ship_catalog;

SET @table_exists = (SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'ship_catalog' AND table_name = 'ships');

CREATE TABLE IF NOT EXISTS ships (
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
);

TRUNCATE TABLE ships;

ALTER TABLE ships AUTO_INCREMENT = 1;

INSERT INTO ships (name, tonnage, passengers, captain, speed, mileage, description, image) VALUES
('Морський Гігант', 1200, 300, 'Іван Петренко', 28, 15000, 'Сучасний круїзний лайнер з усіма зручностями.', '/images/ship1.jpg'),
('Швидкий Вітер', 800, 150, 'Олена Коваль', 35, 20000, 'Швидкісний корабель для морських подорожей.', '/images/ship2.jpg'),
('Океанська Зірка', 1600, 450, 'Михайло Сидоренко', 25, 18000, 'Розкішний лайнер для довгих океанських круїзів.', '/images/ship3.jpg'),
('Атлантика', 1400, 320, 'Андрій Мельник', 22, 22000, 'Комфортабельний корабель для сімейних подорожей.', '/images/ship4.jpg'),
('Блакитна Хвиля', 900, 180, 'Наталія Шевченко', 32, 17000, 'Елегантне судно для романтичних круїзів.', '/images/ship5.jpg'),
('Золотий Вік', 2000, 600, 'Сергій Бондаренко', 20, 25000, 'Величний лайнер з розкішними каютами.', '/images/ship6.jpg'),
('Морський Мандрівник', 750, 120, 'Віктор Ковальчук', 38, 12000, 'Ідеальний для експедицій та досліджень.', '/images/ship7.jpeg');