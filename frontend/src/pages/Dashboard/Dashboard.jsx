import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import PageLoading from "../../components/PageLoading/PageLoading";
import PageRetry from "../../components/PageRetry/PageRetry";

import HorizontalScrollRow from "../../components/HorizontalScrollRow/HorizontalScrollRow";
import FilmCard from '../../components/Cards/FilmCard/FilmCard'

import { useDashboard } from "../../hooks/useDashboard";

export default function Dashboard() {

    const { loading, error, watchlistStreaming, popularFilms, getData } = useDashboard();

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
