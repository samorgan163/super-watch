import styles from "./Watchlist.module.css";
import FilmsGrid from "../../components/FilmsGrid/FilmsGrid";
import PageLoading from "../../components/PageLoading/PageLoading";
import FilmCard from "../../components/Cards/FilmCard/FilmCard";
import PageRetry from "../../components/PageRetry/PageRetry";

import { useState, useEffect } from "react";

import { getWatchlist } from "../../api/watchlist";

export default function Watchlist() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    const [watchlistStreaming, setWatchlistStreaming] = useState([]);
    const [watchlistUnavailable, setWatchlistUnavailable] = useState([]);

    const getData = async () => {
        try {
            setError(false);
            setLoading(true);
            const result = await getWatchlist();
            setWatchlistStreaming(result.streaming);
            setWatchlistUnavailable(result.unavailable);
        } catch (error) {
            setError(true);
        }
        finally {
            setLoading(false);  
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if (loading) return <PageLoading />;

    if (error) return <PageRetry retryAction={getData} />

    return (
        <>
            <section className="section-with-mb section-with-px">
                <FilmsGrid 
                    title='Currently Streaming'
                    items={watchlistStreaming}
                    getKey={(film) => film.tmdbid}
                    renderItem={(film) => (
                        <FilmCard
                            tmdbID={film.tmdbid}
                            title={film.title}
                            poster={film.poster}
                            streaming={film.streaming}
                        />
                    )}
                />
            </section>
            <section className="section-with-mb section-with-px">
                <FilmsGrid 
                    title='Not Available'
                    items={watchlistUnavailable}
                    getKey={(film) => film.tmdbid}
                    renderItem={(film) => (
                        <FilmCard
                            tmdbID={film.tmdbid}
                            title={film.title}
                            poster={film.poster}
                            streaming={film.streaming}
                        />
                    )}
                />
            </section>
        </>
    );
}
