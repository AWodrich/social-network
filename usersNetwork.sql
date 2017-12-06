DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friend_status;


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


CREATE TABLE friend_status (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    recipient_id INTEGER NOT NULL,
    status INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
