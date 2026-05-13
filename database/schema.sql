/* NOTE: if using DBeaver highlight all query */

/* Users table */
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Films table */
CREATE TABLE films (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    poster_path VARCHAR(255),
    release_date DATE
);

/* Streaming providers table */
CREATE TABLE providers (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    logo_path VARCHAR(255)
);

/* User providers table */
CREATE TABLE user_providers (
    user_id INT NOT NULL,
    provider_id INT NOT NULL,

    PRIMARY KEY (user_id, provider_id),

    CONSTRAINT fk_up_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_up_provider
    FOREIGN KEY (provider_id)
    REFERENCES providers(id)
    ON DELETE CASCADE
);

/* Seed user providers */
INSERT INTO user_providers
VALUES
(4, 8),
(4, 9),
(4, 10),
(4, 38),
(4, 41),
(4, 103),
(4, 591),
(4, 613),
(4, 1796),
(4, 2100);

/* OLD - 119 missing from new providers? */
INSERT INTO providers
VALUES
(8, 'NETFLIX'),
(1796, 'NETFLIX'),
(9, 'PRIME'),
(119, 'PRIME'),
(613, 'PRIME'),
(2100, 'PRIME'),
(38, 'BBC'),
(41, 'ITVX'),
(103, 'C4');

/* Film streaming providers table */
CREATE TABLE film_providers (
    film_id INT NOT NULL,
    provider_id INT NOT NULL,

    PRIMARY KEY (film_id, provider_id),

    CONSTRAINT fk_fp_film
    FOREIGN KEY (film_id)
    REFERENCES films(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_fp_provider
    FOREIGN KEY (provider_id)
    REFERENCES providers(id)
    ON DELETE CASCADE
);

/* User watchlist table */
CREATE TABLE watchlist (
    user_id INT NOT NULL,
    film_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, film_id),

    CONSTRAINT fk_w_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
    
    CONSTRAINT fk_w_film
    FOREIGN KEY (film_id)
    REFERENCES films(id)
    ON DELETE CASCADE
);






SELECT 
    films.tmdb_id,
    films.title,
    films.poster_path,
    films.release_date,
    user_watchlist_films.created_at,

    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', sp.tmdb_id,
                'name', sp.name
            )
        )
        FROM film_streaming_providers fsp
        INNER JOIN streaming_providers sp
            ON sp.tmdb_id = fsp.streaming_provider_id
        WHERE fsp.film_id = films.id
    ) AS providers

FROM user_watchlist_films

INNER JOIN films
    ON films.id = user_watchlist_films.film_id

WHERE user_watchlist_films.user_id = 4

ORDER BY user_watchlist_films.created_at DESC;