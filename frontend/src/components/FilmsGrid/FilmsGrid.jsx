import { Link } from 'react-router-dom';
import styles from './FilmsGrid.module.css';
import FilmCard from '../Cards/FilmCard/FilmCard';

import ServiceIcon from '../ServiceIcon/ServiceIcon';

export default function FilmsGrid({ title, films, fadeOpacity = false }) {

    return (
        <div className={styles.filmsGridWrapper}>
            {title && <h2 className='text-l font-bold text-color-primary mb-16'>{title}</h2>}
            <div className={styles.filmsGrid}>
                {films.map((film) => (
                    <div className={ fadeOpacity ? `${styles.film} ${styles.fade}` : styles.film}>
                        
                            <FilmCard 
                                tmdbID={film.tmdbid}
                                title={film.title}
                                poster={film.poster}
                                streaming={film.streaming}
                            />
                       
                    </div>
                ))}
            </div>
        </div>
    );

}
