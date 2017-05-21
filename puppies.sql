DROP DATABASE IF EXISTS puppies;
CREATE DATABASE puppies;

\c puppies;

CREATE TABLE pups (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  breed VARCHAR,
  age INTEGER,
  sex VARCHAR
);

INSERT INTO pups (name, breed, age, sex)
  VALUES ('Tyler', 'Retrieved', 3, 'M');

--  CREATE TABLE bones (
--   ID SERIAL PRIMARY KEY,
--   dogId INTEGER references pups(ID),
--   boneName VARCHAR
-- );

INSERT INTO payments (user_id, firstname, lastname, card, card_number, expires_month, expires_year, csc)
  VALUES (1, 'Harvey', 'Mirijanyan', 'Master Card', '4215 3456 5332 9093', 2, 25, 234);

--  CREATE TABLE payments (
--   ID SERIAL PRIMARY KEY,
--   user_id INTEGER references users(ID),
--   firstname VARCHAR,
--   lastname VARCHAR,
--   card VARCHAR,
--   card_number VARCHAR,
--   expires_month INTEGER,
--   expires_year INTEGER,
--   csc INTEGER
-- );