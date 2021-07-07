DROP TABLE IF EXISTS clothes;
DROP TABLE IF EXISTS food;

CREATE TABLE clothes(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price INTEGER(255)
);

CREATE TABLE food(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price INTEGER(255)
);