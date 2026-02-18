import MetaData from '../../components/Film/MetaData/MetaData'
import Trailer from '../../components/Film/Trailer/Trailer'
import HorizontalFilmScroll2 from '../../components/HorizontalFilmScroll2/HorizontalScrollFilm2'

import { useState, useEffect } from 'react'

import styles from './Film2.module.css'

export default function Film2() {

    const [loading, setLoading] = useState(true);
        
    const [watchlistStreaming, setWatchlistStreaming] = useState([]);
    const [popularFilms, setPopularFilms] = useState([]);

    useEffect(() => {
        const getDashboardData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://192.168.0.77:3000/dashboard`, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const result = await response.json();
                    setWatchlistStreaming(result.streaming_watchlist);
                    setPopularFilms(result.popular_films.results);
                }

            } catch {
                console.log('Network Error');
            }
            finally {
                setLoading(false);  
            }
        }

        getDashboardData();
    }, []);

    return (
        <div className={styles.filmWrapper}>
            <Trailer />
            <div className={styles.contentWrapper}>
                <div className={`${styles.metaDataWrapper} section-with-padding`}>
                    <MetaData />
                </div>
                
                <HorizontalFilmScroll2 films={popularFilms} title='Top Cast' />
            </div>
        </div>
    )

}