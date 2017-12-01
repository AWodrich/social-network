DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS user_bios;
DROP TABLE IF EXISTS images;


CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER not null unique,
    city VARCHAR(300) not null,
    age VARCHAR(300) not null,
    url text not null
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(300) not null,
    last VARCHAR(300) not null,
    email VARCHAR(300) unique not null,
    hashed_password VARCHAR(300) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    user_id INTEGER not null unique,
    image VARCHAR(300) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_bios (
    id SERIAL PRIMARY KEY,
    user_id INTEGER not null unique,
    bio VARCHAR(300) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
