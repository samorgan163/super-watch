import { useEffect, useState } from 'react';

import SearchNavbar from "../../components/SearchNavbar/SearchNavbar";
import SearchResults from '../../components/SearchResults/SearchResults';

import { useSearch } from '../../hooks/useSearch';

export default function Search() {
    
    const [inputValue, setInputValue] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    const { results, loading, hasNextPage, loaderRef } = useSearch(debouncedQuery);

    // debounce query
    useEffect(() => {

        if (inputValue.trim() === '') {
            setDebouncedQuery('');
            return;
        }

        const userTypingDelay = setTimeout(() => {
            setDebouncedQuery(inputValue.trim());
        }, 500); // delay to ensure user has stopped typing
        
        return () => clearTimeout(userTypingDelay);
    }, [inputValue]);


    return (
        <>
            <section className='section-with-px section-with-mb'>
                <SearchNavbar onInputChange={setInputValue} />
            </section>
            <section className='section-with-px section-with-mb'>
                {debouncedQuery && 
                    <SearchResults 
                        results={results}
                        loading={loading}
                        hasMore={hasNextPage}
                        loaderRef={loaderRef}
                    />
                }
            </section>
        </>
    );
}
