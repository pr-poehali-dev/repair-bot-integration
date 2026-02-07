CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    rating DECIMAL(3,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_suppliers_category ON suppliers(category);

INSERT INTO suppliers (name, category, phone, email, address, rating) VALUES
('СтройМатериалы Pro', 'Отделка', '+7 (495) 123-45-67', 'info@stroypro.ru', 'Москва, ул. Строительная, 10', 4.8),
('Электромир', 'Электрика', '+7 (495) 234-56-78', 'sales@electromir.ru', 'Москва, пр. Электриков, 25', 4.9),
('Аквасервис', 'Сантехника', '+7 (495) 345-67-89', 'order@aquaservis.ru', 'Москва, ул. Водопроводная, 5', 4.7),
('МебельЛюкс', 'Мебель', '+7 (495) 456-78-90', 'info@mebellux.ru', 'Москва, ул. Мебельная, 15', 4.6);