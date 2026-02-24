import { useState, useEffect } from "react";
import { getFilm } from "../api/film";

export function useFilm(tmdbID) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
        
    const [filmData, setFilmData] = useState({});
    
    const getData = async () => {
        try {
            console.log('id:', tmdbID);
            if (!tmdbID) return;
            setError(false);
            setLoading(true);
            const result = await getFilm(tmdbID);
            setFilmData(result);
        } catch {
            setError(true);
        }
        finally {
            setLoading(false);  
        }
    }
    
    useEffect(() => {
        getData(tmdbID);
        console.log('film mount');
        return () => {
            console.log('film unmount');
        }
    }, [tmdbID]);

    return { loading, error, filmData, getData };

}
