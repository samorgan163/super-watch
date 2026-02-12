import { Link } from 'react-router-dom';
import styles from './FilmsGrid.module.css';

import ServiceIcon from '../ServiceIcon/ServiceIcon';

export default function FilmsGrid({ title, films, fadeOpacity = false }) {

    return (
        <div className={styles.filmsGridWrapper}>
            {title && <h2>{title}</h2>}
            <div className={styles.filmsGrid}>
                {films.map((film) => (
                    <div className={ fadeOpacity ? `${styles.film} ${styles.fade}` : styles.film}>
                        <Link key={film.tmdbid} to={`/film/${film.tmdbid}`} aria-label={film.title}>
                            <div className={styles.filmImageWrapper}>
                                <div className={styles.serviceWrapper}>
                                    {(film.streaming && film.streaming.length > 0) ? <ServiceIcon service={film.streaming[0]} /> : ''}
                                </div>
                                <img src={film.poster} alt="" />
                            </div>
                        </Link>
                        <p>{film.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );

}
