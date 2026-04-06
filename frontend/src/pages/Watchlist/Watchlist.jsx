import styles from "./Watchlist.module.css";
import MediaGrid from '../../components/Media/MediaGrid/MediaGrid';
import PageLoading from "../../components/UI/PageLoading/PageLoading";
import FilmCard from "../../components/Film/FilmCard/FilmCard";
import PageRetry from "../../components/UI/PageRetry/PageRetry";

import { getWatchlist } from "../../api/watchlist";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMe } from "../../hooks/useMe";

export default function Watchlist() {

    const { data: user } = useMe();
    const userId = user?.user_id;

    const { isLoading, isError, data, error, refetch } = useQuery({
            queryKey: ['watchlist', userId],
            queryFn: () => getWatchlist(),
            retry: false,
            staleTime: 1000 * 60 * 5,
            enabled: !!userId,
        });

    if (isLoading) return <PageLoading />;

    if (isError) return <PageRetry retryAction={refetch} />;

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
                            posterPath={film.poster}
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
                            posterPath={film.poster}
                            streaming={film.streaming}
                        />
                    )}
                />
            </section>
        </>
    );
}
