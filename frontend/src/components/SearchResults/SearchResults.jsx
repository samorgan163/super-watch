import styles from './SearchResults.module.css';

import { Link } from 'react-router-dom';

import { BounceLoader } from "react-spinners";

export default function SearchResults({ results, loading, hasMore, loaderRef }) {

    if (loading && results.length === 0) {
        return (
           <div className={styles.loadingWrapperNew}>
                <BounceLoader
                    color={'#1657c7ff'}
                    //loading={loading}
                    size={30}
                    aria-label="Loading Spinner"
                />
            </div>
        );
    }
    
    if (!loading && results.length === 0) {
        return (
            <div className={styles.noFilmsWrapper}>
                <p>Nothing to see here :&#40;</p>
            </div>
        );
    }

    return (
        
        <div id="search-results-wrapper" className={styles.SearchResultsWrapper}>
            {results.map((film) => (
                <Link 
                    key={film.id} 
                    to={`/film/${film.id}`} 
                    aria-label={film.title} 
                    className={styles.film}
                >
                    <div className={styles.filmPosterWrapper}>
                        {film.poster_path 
                            ? 
                            <img loading="lazy" src={`https://image.tmdb.org/t/p/w400${film.poster_path}`} alt="" />
                            :
                            <img loading="lazy" src="./src/assets/icons/no-film-image.jpg" alt="" />
                        }
                    </div>
                    <div className={styles.filmMetadataWrapper}>
                        <h2 className='font-bold text-md text-color-primary'>
                            {film?.title || 'Unknown'}
                        </h2>
                        <p className='font-regular text-s text-color-primary'>
                            {film?.release_date?.slice(0,4) || 'Unknown'}
                        </p>
                        <p className='font-regular text-s text-color-primary'>
                            Director Name
                        </p>
                    </div>
                </Link>
            ))}

            {hasMore && 
                <div 
                    className={styles.loadingWrapperNew}
                    ref={loaderRef}    
                >
                    <BounceLoader
                        color={'#1657c7ff'}
                        //loading={loading}
                        size={30}
                        aria-label="Loading Spinner"
                    />
                </div>
            }
        </div>
    );
}
