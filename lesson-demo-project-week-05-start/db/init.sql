CREATE TABLE IF NOT EXISTS cities (
  id SERIAL PRIMARY KEY,
  capital VARCHAR(60) NOT NULL,
  country VARCHAR(60) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cities (capital, country) VALUES ('Oslo', 'Norway');
INSERT INTO cities (capital, country) VALUES ('Pretoria', 'South Africa');
INSERT INTO cities (capital, country) VALUES ('Helsinki', 'Finland'); 