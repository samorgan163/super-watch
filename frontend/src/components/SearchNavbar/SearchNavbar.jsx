import { useRef, useState } from 'react';
import styles from './SearchNavbar.module.css';

function SearchNavbar({ onSearchChange }) {
    
    const [inputValue, setInputValue] = useState('');
    const searchBar = useRef(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onSearchChange(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.querySelector('input').blur();
    }

    const clearInput = () => {
        setInputValue('');
        onSearchChange('');
        searchBar.current?.focus();
    };
    
    return (
        <nav className={styles.navTop}>
            <form id="search-bar-form" onSubmit={handleSubmit}>
                <svg className={styles.searchIcon} aria-hidden="true" viewBox="0 0 24 24">
                    <g>
                        <path
                            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                    </g>
                </svg>

                {inputValue &&
                    <svg
                        id="clear-icon"
                        className={styles.clearIcon}
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        onClick={clearInput}>
                        <g>
                            <path
                                d="M18.364 5.636a1 1 0 0 0-1.414 0L12 10.586 7.05 5.636a1 1 0 1 0-1.414 1.414L10.586 12l-4.95 4.95a1 1 0 1 0 1.414 1.414L12 13.414l4.95 4.95a1 1 0 0 0 1.414-1.414L13.414 12l4.95-4.95a1 1 0 0 0 0-1.414z"></path>
                        </g>
                    </svg>
                }

                <input
                    ref={searchBar}
                    enterkeyhint="search"
                    type="text"
                    className={styles.searchBar}
                    name="film-to-search"
                    id="search-bar"
                    placeholder="Add to Watchlist..."
                    value={inputValue}
                    onChange={handleChange}
                    required 
                />

                <button type="submit" hidden></button>
            </form>
        </nav>
    );
}

export default SearchNavbar;