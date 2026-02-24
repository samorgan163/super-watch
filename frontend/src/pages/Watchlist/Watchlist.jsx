import styles from "./Watchlist.module.css";
import FilmsGrid from "../../components/FilmsGrid/FilmsGrid";
import PageLoading from "../../components/PageLoading/PageLoading";
import FilmCard from "../../components/Cards/FilmCard/FilmCard";
import PageRetry from "../../components/PageRetry/PageRetry";

import { useState, useEffect } from "react";

import { getWatchlist } from "../../api/watchlist";
import { useFetch } from "../../hooks/useFetch";

export default function Watchlist() {

    const { loading, error, data, retry } = useFetch(
        () => getWatchlist(), []
    );

    if (loading) return <PageLoading />;

    if (error) return <PageRetry retryAction={retry} />;

    return (
        <>
            <section className="section-with-mb section-with-px">
                <FilmsGrid 
                    title='Currently Streaming'
                    items={data.streaming}
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
                    fadeOpacity={true}
                    items={data.unavailable}
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
