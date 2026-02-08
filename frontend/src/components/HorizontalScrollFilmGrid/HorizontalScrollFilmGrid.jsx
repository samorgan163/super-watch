import { Link } from 'react-router-dom';
import ServiceIcon from '../ServiceIcon/ServiceIcon';
import styles from './HorizontalScrollFilmGrid.module.css';

function HorizontalScrollFilmGrid({ films, title }) {

    return (
        <section className={styles.filmsGridSection}>
            <h2>{title}</h2>
            <div className={styles.filmsGrid}>
                
                {films.map((film) => (
                    <div className={styles.film}>
                        <Link key={film.tmdbid} aria-label={film.title} to={`/film/${film.tmdbid}`}>
                            <div className={styles.filmImageWrapper}>
                                <div className={styles.serviceWrapper}>
                                    {film.streaming?.[0] && 
                                        <ServiceIcon className={styles.service} service={film.streaming[0]} />
                                    }
                                </div>
                                <img loading="lazy" src={film.poster} alt="" />
                            </div>
                        </Link>
                        <p>{film.title}</p>
                    </div>
                ))}
                
            </div>
        </section>
    );
}

export default HorizontalScrollFilmGrid;
