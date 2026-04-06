import styles from "./Dashboard.module.css";
import PageLoading from "../../components/UI/PageLoading/PageLoading";
import PageRetry from "../../components/UI/PageRetry/PageRetry";

import MediaScrollRow from '../../components/Media/MediaScrollRow/MediaScrollRow';
import FilmCard from '../../components/Film/FilmCard/FilmCard';

import { getDashboard } from "../../api/user";
import { useQuery } from '@tanstack/react-query';

import { useMe } from "../../hooks/useMe";

export default function Dashboard() {

    // get user
    const { data: user } = useMe();
    const userId = user?.user_id;

    // get dashboard data
    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ['dashboard', userId],
        queryFn: () => getDashboard(),
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled: !!userId,
    });

    if (isLoading) return <PageLoading />;

    if (isError) return <PageRetry retryAction={refetch} />;

    return (
        <>
            <section className="section-with-mb">
                <MediaScrollRow 
                    title='Streaming From Your Watchlist'
                    items={data.streaming_watchlist}
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
            <section className="section-with-mb">
                <MediaScrollRow 
                    title='Popular Films'
                    items={data.popular_films.results}
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
