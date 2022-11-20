CREATE TABLE "User"(
    User_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    Admin BOOLEAN,
    Worker BOOLEAN,
    owner_id VARCHAR(255),
);
CREATE TABLE "Sensor"(
    Sensor_id SERIAL PRIMARY KEY,
    temp INTEGER,
    humidity INTEGER,
    GPS POINT,
    User_id INTEGER,
    FOREIGN KEY(User_id) REFERENCES "User"(User_id)
);
CREATE TABLE "Product"(
    Product_id SERIAL PRIMARY KEY,
    Product_name VARCHAR(255),
    temp_min INTEGER,
    temp_max INTEGER,
    humidity_min INTEGER,
    humidity_max INTEGER,
    Expiration_date TIMESTAMP,
    Sensor_id INTEGER,
    FOREIGN KEY(Sensor_id) REFERENCES "Sensor"(Sensor_id)
);

