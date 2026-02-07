INSERT INTO repair_requests (client_name, repair_type, description, status) VALUES 
('Анна Смирнова', 'Сантехника', 'Течёт кран на кухне', 'awaiting-confirmation'),
('Пётр Иванов', 'Электрика', 'Не работает розетка в спальне', 'new');

INSERT INTO master_responses (request_id, master_id, status, price, estimated_time, comment) VALUES
(1, 1, 'accepted', 3000, '2-3 часа', 'Готов приехать сегодня после 14:00'),
(1, 2, 'pending', 3500, '1 день', 'Могу выполнить завтра утром');

INSERT INTO supplier_responses (request_id, supplier_id, status, price, delivery_time, materials_available, comment) VALUES
(1, 3, 'pending', 1500, '2 часа', true, 'Смеситель в наличии, доставка бесплатная'),
(1, 1, 'accepted', 1800, '3 часа', true, 'Премиум-смеситель с гарантией');