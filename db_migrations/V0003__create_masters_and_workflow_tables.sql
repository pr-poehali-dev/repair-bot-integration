CREATE TABLE masters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    rating DECIMAL(3,2) DEFAULT 0,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_masters_specialization ON masters(specialization);

CREATE TABLE repair_requests (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(255),
    repair_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    master_id INTEGER REFERENCES masters(id),
    supplier_id INTEGER REFERENCES suppliers(id),
    master_confirmed BOOLEAN DEFAULT false,
    supplier_confirmed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_repair_requests_status ON repair_requests(status);

CREATE TABLE consultations (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT,
    client_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO masters (name, specialization, phone, email, rating, available) VALUES
('Иван Петров', 'Сантехника', '+7 (495) 111-22-33', 'ivan@master.ru', 4.9, true),
('Алексей Сидоров', 'Электрика', '+7 (495) 222-33-44', 'alex@master.ru', 4.8, true),
('Дмитрий Кузнецов', 'Отделка', '+7 (495) 333-44-55', 'dmitry@master.ru', 4.7, true),
('Сергей Михайлов', 'Мебель', '+7 (495) 444-55-66', 'sergey@master.ru', 4.6, true),
('Николай Волков', 'Малярные работы', '+7 (495) 555-66-77', 'nikolay@master.ru', 4.8, true);