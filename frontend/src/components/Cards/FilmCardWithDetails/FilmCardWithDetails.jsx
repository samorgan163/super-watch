import { Link } from "react-router-dom";
import styles from './FilmCardWithDetails.module.css';

import FilmPoster from '../../Posters/FilmPoster/FilmPoster';

export default function FilmCardWithDetails({ tmdbID, title, poster, releaseDate, director }) {

    const cleanedTitle = title || 'Unknown';
    const formattedRelease = releaseDate?.slice(0, 4) || 'Unknown';
    // TODO: Add director

    return (
        <Link 
            key={tmdbID} 
            to={`/film/${tmdbID}`} 
            aria-label={title} 
            className={styles.film}
        >
            <div className={styles.filmPosterWrapper}>
                <FilmPoster title={title} posterPath={poster} />
            </div>
            <div className={styles.filmMetadataWrapper}>
                <h2 className={styles.title}>{cleanedTitle}</h2>
                <p className={styles.release}>{formattedRelease}</p>
            </div>
        </Link>
    );
    
}
