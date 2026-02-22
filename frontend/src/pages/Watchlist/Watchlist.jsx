import styles from "./Watchlist.module.css";
import FilmsGrid from "../../components/FilmsGrid/FilmsGrid";
import PageLoading from "../../components/PageLoading/PageLoading";
import FilmCard from "../../components/Cards/FilmCard/FilmCard";

import { useState, useEffect } from "react";

function Watchlist() {

    const [loading, setLoading] = useState(true);
    
    const [watchlistStreaming, setWatchlistStreaming] = useState([]);
    const [watchlistUnavailable, setWatchlistUnavailable] = useState([]);

    useEffect(() => {
        const getWatchlist = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://192.168.0.77:3000/watchlist`, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const result = await response.json();
                    setWatchlistStreaming(result.streaming);
                    setWatchlistUnavailable(result.unavailable);
                }

            } catch (error) {
                console.log('Network Error:', error);
            }
            finally {
                setLoading(false);  
            }
        }

        getWatchlist();
    }, []);

    if (loading) return <PageLoading />;

    return (
        <>
            <section className="section-with-mb section-with-px">
                <FilmsGrid 
                    title='Currently Streaming'
                    items={watchlistStreaming || []}
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
                    items={watchlistUnavailable || []}
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

export default Watchlist;
