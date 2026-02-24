import styles from "./Dashboard.module.css";
import PageLoading from "../../components/PageLoading/PageLoading";
import PageRetry from "../../components/PageRetry/PageRetry";

import HorizontalScrollRow from "../../components/HorizontalScrollRow/HorizontalScrollRow";
import FilmCard from '../../components/Cards/FilmCard/FilmCard'

import { useFetch } from "../../hooks/useFetch";
import { getDashboard } from "../../api/user";

export default function Dashboard() {

    const { loading, error, data, retry } = useFetch(
        () => getDashboard(), []
    );

    if (loading) return <PageLoading />;

    if (error) return <PageRetry retryAction={retry} />;

    return (
        <>
            <section className="section-with-mb">
                <HorizontalScrollRow 
                    title='Streaming From Your Watchlist'
                    items={data.streaming_watchlist}
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
                    items={data.popular_films.results}
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
