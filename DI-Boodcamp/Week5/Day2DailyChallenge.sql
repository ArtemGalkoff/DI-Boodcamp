-- CREATE TABLE actors(
--  actor_id SERIAL PRIMARY KEY,
--  first_name VARCHAR (50) NOT NULL,
--  last_name VARCHAR (100) NOT NULL,
--  age DATE NOT NULL,
--  number_oscars SMALLINT NOT NULL
-- )

INSERT INTO actors (first_name, last_name, age,number_oscars )
VALUES
('Tom', 'Hanks', '07/09/1956', 2),
('Meryl', 'Streep', '06/22/1949', 2),
('Emma', 'Stone', '11/06/1988', 1);