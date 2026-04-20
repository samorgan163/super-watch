import styles from "./Watchlist.module.css";
import MediaGrid from '../../../../components/Media/MediaGrid/MediaGrid';
import PageLoading from "../../../../components/UI/PageLoading/PageLoading";
import FilmCard from '../../../../components/Cards/FilmCard/FilmCard';
import PageRetry from "../../../../components/UI/PageRetry/PageRetry";

import { useWatchlistPage } from "../../hooks";

export default function Watchlist() {

    const { isLoading, isError, data, error, refetch } = useWatchlistPage();

    if (isLoading) return <PageLoading />;

    if (isError) return <PageRetry retryAction={refetch} />;

    return (
        <div className={styles.container}>
            <section>
                <MediaGrid 
                    title='Currently Streaming'
                    items={data.streaming}
                    getKey={(film) => film.tmdbid}
                    renderItem={(film) => (
                        <FilmCard
                            tmdbID={film.tmdbid}
                            title={film.title}
                            posterPath={film.poster}
                            streaming={film.streaming}
                        />
                    )}
                />
            </section>
            <section>
                <MediaGrid 
                    title='Not Available'
                    fadeOpacity={true}
                    items={data.unavailable}
                    getKey={(film) => film.tmdbid}
                    renderItem={(film) => (
                        <FilmCard
                            tmdbID={film.tmdbid}
                            title={film.title}
                            posterPath={film.poster}
                            streaming={film.streaming}
                        />
                    )}
                />
            </section>
        </div>
    );
}
