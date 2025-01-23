CREATE TABLE IF NOT EXISTS cities (
	id SERIAL PRIMARY KEY,
	country VARCHAR(60) NOT NULL,
	capital VARCHAR(60) NOT NULL,
	created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

INSERT INTO cities (capital, country)
VALUES 
	('Oslo', 'Norway'),
	('Pretoria', 'South Africa'),
	('Helsinki', 'Finland');