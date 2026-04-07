import styles from "./Dashboard.module.css";
import PageLoading from "../../components/UI/PageLoading/PageLoading";
import PageRetry from "../../components/UI/PageRetry/PageRetry";

import MediaScrollRow from '../../components/Media/MediaScrollRow/MediaScrollRow';
import FilmCard from '../../components/Film/FilmCard/FilmCard';

import { useDashboardPage } from "../../features/dashboard/hooks";

export default function Dashboard() {
    // get dashboard data
    const { isLoading, isError, data, error, refetch } = useDashboardPage();

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
