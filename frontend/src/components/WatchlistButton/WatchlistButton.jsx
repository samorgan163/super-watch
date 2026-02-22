import styles from './WatchlistButton.module.css';

import { useWatchlist } from '../../hooks/useWatchlist';

export default function WatchlistButton({ tmdbId }) {

    const { inWatchlist, loading, toggleWatchlist } = useWatchlist(tmdbId);

    return (
        <button 
            className={`
                ${styles.watchlistBtn} 
                ${inWatchlist ? styles.liked : ""} 
                button
                button-circle
            `}
            disabled={loading}
            onClick={toggleWatchlist}
        >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="2.8235"/>
                <path 
                    d="M21.6 11.07C15.215 20.43 8.78497 20.43 2.39997 11.07C5.43736 7.78 9.05864 6 12.096 6C15.3293 6 18.5626 7.78 21.6 11.07Z" 
                    stroke-width="1.5" 
                    stroke-linejoin="round"/>
            </svg>
        </button>
    );
}
