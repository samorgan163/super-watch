import styles from "./Dashboard.module.css";
import HorizontalScrollFilmGrid from '../../components/HorizontalScrollFilmGrid/HorizontalScrollFilmGrid';
import { useEffect, useState } from "react";
import PageLoading from "../../components/PageLoading/PageLoading";

import HorizontalScrollRow from "../../components/HorizontalScrollRow/HorizontalScrollRow";
import FilmCard from '../../components/Cards/FilmCard/FilmCard'

export default function Dashboard() {

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

    if (loading) return <PageLoading />;

    return (
        <>
            <section className="section-with-mb">
                <HorizontalScrollRow 
                    title='Streaming From Your Watchlist'
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
            <section>
                <HorizontalScrollRow 
                    title='Popular Films'
                    items={popularFilms}
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
