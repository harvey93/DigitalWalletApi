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

-- INSERT INTO payments (user_id, firstname, lastname, card, card_number, expires_month, expires_year, csc)
--   VALUES (2, 'Vazgen', 'Sargisyan', 'Master Card', '2131 3432 2342 2312', 3, 12, 098);

-- INSERT INTO users(username)
--   VALUES ('Harvey');

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