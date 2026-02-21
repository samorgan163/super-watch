import styles from './SearchResults.module.css';

import popcorn from '../../assets/icons/ratings-icons/popcorn.png';
import tomato from '../../assets/icons/ratings-icons/tomato.png';
import imdb from '../../assets/icons/ratings-icons/imdb.png';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { BounceLoader } from "react-spinners";

function SearchResults({ query }) {

    const [results, setResults] = useState([]);
    const [initialLoading, setInitialLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const loaderRef = useRef(null);

    // function to send search request
    const getResults = async (searchQuery, pageNum) => {
        try {  
            const formattedQuery = searchQuery//.replaceAll(' ', '+');
            const response = await fetch(
                `http://192.168.0.77:3000/film/search?title=${encodeURIComponent(formattedQuery)}&page=${encodeURIComponent(pageNum)}`, {
                method: "GET",
                credentials: "include",
            });
            const result = await response.json();

            // artificial delay for testing
            /* await new Promise(resolve => setTimeout(resolve, 2000)); */

            setResults(prev =>
                result.page === 1 ? (result.results || []) : [...prev, ...(result.results || [])]
            );

            setHasMore(result.page < result.total_pages);            
        } catch (error) {
            console.log('Network Error');
        }
    }

    // load initial results when query changes
    useEffect(() => {
        if (!query) return;

        const initialLoad = async () => {
            setInitialLoading(true);
            setResults([]); // clear previous results
            setPage(1); // reset to first page
            await getResults(query, 1);
            setInitialLoading(false);
        }

        initialLoad();
    }, [query]);

    // Observe loaderRef
    useEffect(() => {
        if (!hasMore) return; // stop if no more data

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setPage(prev => prev + 1); // trigger next page
                }
            },
            { threshold: 1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [hasMore]);

    // Fetch new page when page changes
    useEffect(() => {
        if (page > 1) {
            getResults(query, page);
        }
    }, [page]);

    if (initialLoading) {
        return (
            <section id="search-results-wrapper" className={styles.SearchResultsWrapper}>
                <div ref={loaderRef} className={styles.loading}>
                    <BounceLoader
                        color={'#1657c7ff'}
                        //loading={loading}
                        size={30}
                        aria-label="Loading Spinner"
                    />
                </div>
            </section>
        );
    }
    
    if (!initialLoading && results.length === 0) {
        return (
            <div className={styles.noFilmsWrapper}>
                <p>Nothing to see here :&#40;</p>
            </div>
        );
    }

    return (
        <div id="search-results-wrapper" className={styles.SearchResultsWrapper}>
            {results.map((film) => (
                <Link key={film.id} to={`/film/${film.id}`} aria-label={film.title} className={styles.film}>
                    <div className={styles.filmPosterWrapper}>
                        {film.poster_path 
                            ? 
                            <img loading="lazy" src={`https://image.tmdb.org/t/p/w400${film.poster_path}`} alt="" />
                            :
                            <img loading="lazy" src="./src/assets/icons/no-film-image.jpg" alt="" />
                        }
                    </div>
                    <div className={styles.filmMetadataWrapper}>
                        <h2 className='font-bold text-md text-color-primary'>{film.title}</h2>
                        <p className='font-regular text-s text-color-primary'>{film?.release_date.slice(0,4)}</p>
                        <p className='font-regular text-s text-color-primary'>Director Name</p>
                    </div>
                </Link>
            ))}

            {/* Loader / sentinel */}
            {hasMore && 
                <div ref={loaderRef} className={styles.loading}>
                    <BounceLoader
                        color={'#1657c7ff'}
                        //loading={loading}
                        size={30}
                        aria-label="Loading Spinner"
                    />
                </div>} 

        </div>
    );
}

export default SearchResults;
