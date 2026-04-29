import styles from './Search.module.css';

import { useEffect, useState } from 'react';

import SearchNavbar from '../components/SearchNavbar/SearchNavbar';
import SearchResults from '../components/SearchResults/SearchResults';

import { useSearch } from '../hooks';
import { useSearchParams } from 'react-router-dom';

export default function Search() {

    // get query from search params for back navigation
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    
    const [inputValue, setInputValue] = useState(query);

    const { 
        data, 
        isLoading, 
        isFetchingNextPage, 
        hasNextPage, 
        loaderRef 
    } = useSearch(query);

    // sync input from search params for back navigation
    useEffect(() => setInputValue(query), [query]); 

    // debounce to wait for user to finish typing
    useEffect(() => {
        const trimmed = inputValue.trim();

        // using replace to only save the last search
        // gives app feel on mobile
        if (!trimmed) return setSearchParams({}, { replace: true });

        const userTypeDelay = setTimeout(() => {
            setSearchParams({ q: trimmed }, { replace: true });
        }, 500);

        return () => clearTimeout(userTypeDelay);
    }, [inputValue]);

    return (
        <div className={styles.container}>
            <section>
                <SearchNavbar onChange={setInputValue} inputValue={inputValue}/>
            </section>
            <section>
                {inputValue && 
                    <SearchResults 
                        results={data}
                        isInitialLoading={isLoading}
                        isFetchingNextPage={isFetchingNextPage}
                        loaderRef={loaderRef}
                        hasNextPage={hasNextPage}
                    />
                }
            </section>
        </div>
    );
}
