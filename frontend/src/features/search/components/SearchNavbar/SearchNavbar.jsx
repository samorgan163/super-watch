import styles from './SearchNavbar.module.css';
import Input from '../../../../components/UI/Input/Input';

import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

import { useRef, useState } from 'react';

export default function SearchNavbar({ onChange, inputValue }) {
    
    const searchBarRef = useRef(null);

    const handleChange = (e) => onChange(e.target.value);

    // hide keyboard, request is already handled when input changes
    const handleSubmit = (e) => {
        e.preventDefault();
        searchBarRef.current?.blur();
    }

    const clearInput = () => {
        onChange('');
        searchBarRef.current?.focus();
    };
    
    return (
        <form className={styles.searchBarForm} id="search-bar-form" onSubmit={handleSubmit}>
            <Input
                ref={searchBarRef}
                enterkeyhint="search"
                type="text"
                name="film-to-search"
                id="search-bar"
                placeholder="Add to Watchlist..."
                value={inputValue}
                onChange={handleChange}
                leftIcon={<IoSearch />}
                rightIcon={
                    inputValue && (
                        <button 
                            type='button' 
                            onClick={clearInput}
                            className={styles.iconButton}
                            aria-label='Clear search'
                        >
                            <IoClose />
                        </button>
                    )
                }
            />
        
            {/* Needed for mobile */}
            <button type="submit" hidden></button>
        </form>
    );
}
