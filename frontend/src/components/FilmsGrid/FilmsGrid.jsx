import { Link } from 'react-router-dom';
import styles from './FilmsGrid.module.css';
import FilmCard from '../Cards/FilmCard/FilmCard';

import ServiceIcon from '../ServiceIcon/ServiceIcon';

export default function FilmsGrid({ title, films, fadeOpacity = false }) {

    return (
        <div className={styles.filmsGridWrapper}>
            {title && <h2>{title}</h2>}
            <div className={styles.filmsGrid}>
                {films.map((film) => (
                    <div className={ fadeOpacity ? `${styles.film} ${styles.fade}` : styles.film}>
                        <Link key={film.tmdbid} to={`/film/${film.tmdbid}`} aria-label={film.title}>
                            <FilmCard 
                                tmdbID={film.tmdbid}
                                title={film.title}
                                poster={film.poster}
                                streaming={film.streaming}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );

}
