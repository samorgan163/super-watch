import { useEffect, useState } from 'react';

import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import SearchNavbar from "../../components/SearchNavbar/SearchNavbar";
import SearchResults from '../../components/SearchResults/SearchResults';

export default function Search() {
    
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
            <section className='section-with-px section-with-mb'>
                <SearchNavbar onSearchChange={setSearchTerm} />
            </section>
            <section className='section-with-px section-with-mb'>
                {query && <SearchResults query={query} />}
            </section>
        </>
    );
}
