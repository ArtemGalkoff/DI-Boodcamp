DELETE FROM film WHERE film_id = 1;
13:39:05
DELETE FROM new_film WHERE film_id = 1;
13:38:59
CONSTRAINT film FOREIGN KEY (film_id) REFERENCES film(film_id) ON DELETE CASCADE
13:38:45
CONSTRAINT film FOREIGN KEY (film_id) REFERENCES new_film(film_id) ON DELETE CASCADE
13:38:37
INSERT INTO customer_review (film_id, language_id, title, score, review_text, last_update) VALUES (1, 1, 'Amazing Movie!', 10, 'Inception is a masterpiece with an incredible plot and visual effects.', CURRENT_TIMESTAMP);
13:38:13
INSERT INTO customer_review (film_id, language_id, title, score, review_text, last_update) VALUES (2, 2, 'Excellente Film!', 9, 'The Dark Knight is a thrilling and complex film with a great performance by Heath Ledger as the Joker.', CURRENT_TIMESTAMP);
13:37:58
INSERT INTO film (title) VALUES ('Inception'), ('The Dark Knight');
13:37:42
CREATE TABLE customer_review ( review_id SERIAL PRIMARY KEY, film_id INT NOT NULL, language_id INT NOT NULL, title VARCHAR(255), score INT CHECK (score >= 1 AND score <= 10), review_text TEXT, last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT film FOREIGN KEY (film_id) REFERENCES film(film_id) ON DELETE CASCADE, CONSTRAINT fk_language FOREIGN KEY (language_id) REFERENCES language(language_id) ON DELETE CASCADE );
13:35:36
CREATE TABLE customer_review ( review_id SERIAL PRIMARY KEY, film_id INT NOT NULL, language_id INT NOT NULL, title VARCHAR(255), score INT CHECK (score >= 1 AND score <= 10), review_text TEXT, last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT fk_film FOREIGN KEY (film_id) REFERENCES new_film(film_id) ON DELETE CASCADE, CONSTRAINT fk_language FOREIGN KEY (language_id) REFERENCES language(language_id) ON DELETE CASCADE );
13:34:28
SELECT f.title, r.rental_id, r.return_date, p.amount FROM rental r JOIN customer c ON r.customer_id = c.customer_id JOIN film f ON f.film_id = f.film_id JOIN payment p ON r.rental_id = p.rental_id WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan' AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';
13:21:18
SELECT f.title, r.rental_id, r.return_date, p.amount FROM rental r JOIN customer c ON r.customer_id = c.customer_id JOIN film f ON f.film_id = f.film_id JOIN payment p ON r.rental_id = p.rental_id WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan'
13:20:37
SELECT f.title, r.rental_id, r.return_date, p.amount FROM rental r JOIN customer c ON r.customer_id = c.customer_id JOIN film f ON f.film_id = f.film_id JOIN payment p ON r.rental_id = p.rental_id WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan' AND r.return_date BETWEEN '2005-07-28 00:00:00' AND '2005-08-01 23:59:59';
13:20:17
SELECT f.title, r.rental_id, r.return_date, p.amount FROM rental r JOIN customer c ON r.customer_id = c.customer_id JOIN film f ON f.film_id = f.film_id JOIN payment p ON r.rental_id = p.rental_id WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan' AND p.amount > 4.00 AND r.return_date BETWEEN '2005-07-28 00:00:00' AND '2005-08-01 23:59:59';
13:19:27
SELECT f.title, r.rental_id, r.return_date, p.amount FROM rental r JOIN customer c ON r.customer_id = c.customer_id JOIN film f ON r.film_id = f.film_id JOIN payment p ON r.rental_id = p.rental_id WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan' AND p.amount > 4.00 AND r.return_date BETWEEN '2005-07-28 00:00:00' AND '2005-08-01 23:59:59';
13:18:28
SELECT f.title, r.rental_id, r.return_date, p.amount FROM rental r JOIN customers c ON r.customer_id = c.customer_id JOIN film f ON r.film_id = f.film_id JOIN payment p ON r.rental_id = p.rental_id WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan' AND p.amount > 4.00 AND r.return_date BETWEEN '2005-07-28 00:00:00' AND '2005-08-01 23:59:59';
13:18:16
 SELECT * FROM rental;
13:15:55
 SELECT * FROM customer;
13:14:50
13:14:37
 SELECT * FROM payment;
13:14:19
DELETE FROM film WHERE film_id = 1;
Total rows:
CRLF
Ln 1, Col 1