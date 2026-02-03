import { useEffect, useState } from 'react';
import styles from './WatchlistButton.module.css';

function WatchlistButton({ tmdbId }) {

    

    return (
        <button 
              
        >
            <svg width="34" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="17" r="4" fill="white" fill-opacity="0.8"/>
                <path d="M27 16.2638C20.019 26.5787 9.98103 26.5787 3 16.2638C6.7967 11.4662 11.3233 10 15.12 10C19.1616 10 23.2033 11.4662 27 16.2638Z" stroke="white" stroke-opacity="0.8" stroke-width="2" stroke-linejoin="round"/>
            </svg>
        </button>
    );
}

export default WatchlistButton; 