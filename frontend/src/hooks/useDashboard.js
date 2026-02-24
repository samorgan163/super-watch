import { useState, useEffect } from "react";
import { getDashboard } from "../api/user";

export function useDashboard() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
        
    const [watchlistStreaming, setWatchlistStreaming] = useState([]);
    const [popularFilms, setPopularFilms] = useState([]);
    
    const getData = async () => {
        try {
            setError(false);
            setLoading(true);
            const result = await getDashboard();
            setWatchlistStreaming(result.streaming_watchlist);
            setPopularFilms(result.popular_films.results);
        } catch {
            setError(true);
        }
        finally {
            setLoading(false);  
        }
    }
    
    useEffect(() => {
        getData();
        console.log('dashboard mount');
        return () => {
            console.log('dashboard unmount');
        }
    }, []);

    return { loading, error, watchlistStreaming, popularFilms, getData };

}
