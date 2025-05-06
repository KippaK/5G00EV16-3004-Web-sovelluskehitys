CREATE TABLE IF NOT EXISTS cities (
  id SERIAL PRIMARY KEY,
  capital VARCHAR(60) NOT NULL,
  country VARCHAR(60) NOT NULL,
  image VARCHAR(100),
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cities (capital, country, image) VALUES ('Oslo', 'Norway', 'Oslo.png');
INSERT INTO cities (capital, country, image) VALUES ('Pretoria', 'South Africa', 'Pretoria.png');
INSERT INTO cities (capital, country, image) VALUES ('Helsinki', 'Finland', 'Helsinki.png'); 

CREATE TABLE IF NOT EXISTS users (
  id varchar(36) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(60) NOT NULL,
  password_hash VARCHAR(60) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
