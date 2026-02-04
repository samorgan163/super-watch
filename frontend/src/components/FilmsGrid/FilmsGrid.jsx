import { Link } from 'react-router-dom';
import styles from './FilmsGrid.module.css';

import ServiceIcon from '../ServiceIcon/ServiceIcon';

function FilmsGrid({ films, fadeOpacity = false }) {

    if (fadeOpacity) {
        return (
            <section className={styles.filmsGridSection}>
                <div className={styles.filmsGrid}>
                    
                    {films.map((film) => (
                        <div className={`${styles.film} ${styles.fade}`}>
                            <Link key={film.film.tmdbid} to={`/film/${film.film.tmdbid}`} aria-label={film.film.title}>
                                <div className={styles.filmImageWrapper}>
                                    <img src={film.film.poster} alt="" />
                                </div>
                            </Link>
                            <p>{film.film.title}</p>
                        </div>
                    ))}

                </div>
            </section>
        );
    }
    
    return (
        <section className={styles.filmsGridSection}>
            <div className={styles.filmsGrid}>
                
                {films.map((film) => (
                    <div className={`${styles.film}`}>
                        <Link key={film.film.tmdbid} to={`/film/${film.film.tmdbid}`} aria-label={film.film.title}>
                            <div className={styles.filmImageWrapper}>
                                <div className={styles.serviceWrapper}>

                        
                                    {(film.film.streaming && film.film.streaming.length > 0) ? <ServiceIcon service={film.film.streaming[0]} /> : ''}
                                    
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

export default FilmsGrid;