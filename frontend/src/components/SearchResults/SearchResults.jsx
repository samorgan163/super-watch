import styles from './SearchResults.module.css';
import FilmCardWithDetails from '../Cards/FilmCardWithDetails/FilmCardWithDetails';

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
                <FilmCardWithDetails 
                    tmdbID={film.id}
                    title={film.title}
                    poster={film.poster_path}
                    releaseDate={film.release_date}
                    director={film.director}
                />
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
