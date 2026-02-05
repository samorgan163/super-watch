// css
import { Link } from 'react-router-dom';
import ServiceIcon from '../ServiceIcon/ServiceIcon';
import styles from './HorizontalScrollFilmGrid.module.css';

function HorizontalScrollFilmGrid({ films }) {

    return (
        <section className={styles.filmsGridSection}>
            <h2>Streaming From Watchlist</h2>
            <div className={styles.filmsGrid}>
                
                {films.map((film) => (
                    <div className={styles.film}>
                        <Link key={film.film.tmdbid} aria-label={film.film.title} to={`/film/${film.film.tmdbid}`}>
                            <div className={styles.filmImageWrapper}>
                                <div className={styles.serviceWrapper}>
                                    <ServiceIcon className={styles.service} service={film.film.streaming[0]} />
                                </div>
                                <img loading="lazy" src={film.film.poster} alt="" />
                            </div>
                        </Link>
                        <p>{film.film.title}</p>
                    </div>
                ))}
                
            </div>
        </section>
    );
}

export default HorizontalScrollFilmGrid;
