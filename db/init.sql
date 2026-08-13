-- Initialisation de la base SmartTask
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'todo',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Quelques données d'exemple
INSERT INTO tasks (title, description, status) VALUES
    ('Configurer Docker', 'Mettre en place les conteneurs SmartTask', 'done'),
    ('Rédiger le rapport', 'Documenter chaque étape avec captures d''écran', 'todo');
