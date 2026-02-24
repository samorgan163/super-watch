import styles from "./Dashboard.module.css";
import HorizontalScrollFilmGrid from '../../components/HorizontalScrollFilmGrid/HorizontalScrollFilmGrid';
import { useEffect, useState } from "react";
import PageLoading from "../../components/PageLoading/PageLoading";
import PageRetry from "../../components/PageRetry/PageRetry";

import HorizontalScrollRow from "../../components/HorizontalScrollRow/HorizontalScrollRow";
import FilmCard from '../../components/Cards/FilmCard/FilmCard'

import { getDashboard } from "../../api/user";

export default function Dashboard() {

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
    }, []);

    if (loading) return <PageLoading />;

    if (error) return <PageRetry retryAction={getData} />;

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
            <section className="section-with-mb">
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
