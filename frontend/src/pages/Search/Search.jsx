import { useEffect, useState } from 'react';

import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import SearchNavbar from "../../components/SearchNavbar/SearchNavbar";
import SearchResults from '../../components/SearchResults/SearchResults';

function Search() {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [query, setQuery] = useState('');

    useEffect(() => {

        if (searchTerm.trim() === '') {
            setQuery('');
            return;
        }

        const userTypingDelay = setTimeout(() => {
            setQuery(searchTerm.trim());
        }, 500); // delay to ensure user has stopped typing
        
        return () => clearTimeout(userTypingDelay);
    }, [searchTerm]);


    return (
        <>
            <SearchNavbar onSearchChange={setSearchTerm} />
            <main>
                {query && <SearchResults query={query} />}
            </main>
            <BottomNavbar/>
        </>
    );
}

export default Search;