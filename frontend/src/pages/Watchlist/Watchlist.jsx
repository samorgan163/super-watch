import styles from "./Watchlist.module.css";
import MediaGrid from '../../components/Media/MediaGrid/MediaGrid';
import PageLoading from "../../components/UI/PageLoading/PageLoading";
import FilmCard from "../../components/Film/FilmCard/FilmCard";
import PageRetry from "../../components/UI/PageRetry/PageRetry";

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
                <MediaGrid 
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
                <MediaGrid 
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
