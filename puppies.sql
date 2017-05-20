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

-- INSERT INTO bones (dogId, boneName)
--   VALUES (6, 'Bone 5');