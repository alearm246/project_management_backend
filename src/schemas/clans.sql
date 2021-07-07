CREATE TABLE clans (
    id SERIAL PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL,
    game varchar(255) NOT NULL,
    user_id INT REFERENCES users(id)
);