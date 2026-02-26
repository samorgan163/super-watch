import { Link } from "react-router-dom";
import styles from './FilmCardWithDetails.module.css';

export default function FilmCardWithDetails({ tmdbID, title, poster, releaseDate, director }) {

    return (
        <Link 
            key={tmdbID} 
            to={`/film/${tmdbID}`} 
            aria-label={title} 
            className={styles.film}
        >
            <div className={styles.filmPosterWrapper}>
                {poster 
                    ? 
                    <img loading="lazy" src={`https://image.tmdb.org/t/p/w400${poster}`} alt="" />
                    :
                    <img loading="lazy" src="./src/assets/icons/no-film-image.jpg" alt="" />
                }
            </div>
            <div className={styles.filmMetadataWrapper}>
                <h2 className='font-bold text-md text-color-primary'>
                    {title ?? 'Unknown'}
                </h2>
                <p className='font-regular text-s text-color-primary'>
                    {releaseDate.slice(0,4) ?? 'Unknown'}
                </p>
                <p className='font-regular text-s text-color-primary'>
                    {director}
                </p>
            </div>
        </Link>
    );
    
}
