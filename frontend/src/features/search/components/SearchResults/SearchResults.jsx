import styles from './SearchResults.module.css';
import FilmCardWithDetails from '../../../../components/Cards/FilmCardWithDetails/FilmCardWithDetails';

import { BounceLoader } from "react-spinners";

export default function SearchResults({ 
    results, 
    isInitialLoading, 
    isFetchingNextPage, 
    loaderRef,
    hasNextPage
}) {

    // initial page loading
    if (isInitialLoading || !results) {
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

    // flatted results into array
    const resultsArray = results.pages.flatMap(page => page.results);
    
    // no results from search
    if (resultsArray.length === 0) {
        return (
            <div className={styles.noFilmsWrapper}>
                <p>Nothing to see here :&#40;</p>
            </div>
        );
    }

    return (
        <div id="search-results-wrapper" className={styles.SearchResultsWrapper}>
            
            {resultsArray.map((film) => (
                <FilmCardWithDetails 
                    key={film.id}
                    tmdbID={film.id}
                    title={film.title}
                    poster={film.poster_path}
                    releaseDate={film.release_date}
                    director={film.director}
                />
            ))}

            {hasNextPage && (
                <div 
                    className={styles.loadingWrapperNew}
                    ref={loaderRef}    
                >
                    {isFetchingNextPage && (
                        <BounceLoader
                            color={'#1657c7ff'}
                            //loading={loading}
                            size={30}
                            aria-label="Loading Spinner"
                        />
                    )}
                </div>
            )}

        </div>
    );
}
