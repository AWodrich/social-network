DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(300) not null,
    last VARCHAR(300) not null,
    email VARCHAR(300) unique not null,
    bios TEXT,
    image TEXT,
    hashed_password VARCHAR(300) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
