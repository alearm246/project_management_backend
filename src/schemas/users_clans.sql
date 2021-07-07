CREATE TABLE users_clans (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    clan_id INT REFERENCES clans(id)
)