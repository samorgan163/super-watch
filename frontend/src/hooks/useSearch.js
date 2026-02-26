import { useState, useRef, useEffect, useCallback } from "react";

import { searchFilms } from "../api/film";

import { useInfiniteScroll } from "./useInfiniteScroll";

export function useSearch(query) {
    
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);

    const loaderRef = useRef(null);

    const abortControllerRef = useRef(null);

    // function to send search request
    const getResults = async (searchQuery, pageNum) => {

        // cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        // set abort controller ref
        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        
        setLoading(true);

        try {  
            const result = await searchFilms(searchQuery, pageNum, abortController.signal);

            // TODO: this checking of page may be redundant,
            // we revert state back to default on query change below,
            // more efficient to just append fetched results to results?
            setResults(prev =>
                result.page === 1 
                    ? (result.results) 
                    : [...prev, ...(result.results)] // apend new results to old results
            );

            setHasNextPage(result.page < result.total_pages);
        } catch (error) {
            if (error.name === "AbortError") {
                console.log('Request aborted');
                return;
            }
        }
        finally {
            setLoading(false);
        }
    }

    // for inital fetch
    useEffect(() => {

        if (!query) return;

        // query has changed, revert to default state
        setResults([]);
        setPage(1);

        getResults(query, 1);
    }, [query]);

    // for pagination fetches
    useEffect(() => {
        if (!query) return;

        // page has changed, make sure it is not page 1
        if (page > 1) getResults(query, page);

    }, [query, page]);

    // callback function for observer,
    // observer will change page, triggering a pagination fetch
    const getNextPage = useCallback(() => {
        if (hasNextPage && !loading) {
            setPage(prev => prev + 1);
        }
    }, [hasNextPage, loading]);

    // observer to detect when user expects pagination results
    useInfiniteScroll(
        hasNextPage,
        loaderRef,
        getNextPage,
    );

    return { results, loading, hasNextPage, loaderRef };

}
