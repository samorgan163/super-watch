import styles from "./Watchlist.module.css";
import MediaGrid from '../../../../components/Media/MediaGrid/MediaGrid';
import PageLoading from "../../../../components/UI/PageLoading/PageLoading";
import FilmCard from '../../../../components/Cards/FilmCard/FilmCard';
import PageRetry from "../../../../components/UI/PageRetry/PageRetry";

import PageLayout from "../../../../layouts/PageLayout/PageLayout";

import { useWatchlistPage } from "../../hooks";

export default function Watchlist() {

    const { isLoading, isError, data, error, refetch } = useWatchlistPage();

    if (isLoading) return <PageLoading />;

    if (isError) return <PageRetry retryAction={refetch} />;

    return (
        <PageLayout>
            <section>
                <MediaGrid 
                    title='Watchlist'
                    items={data}
                    getKey={(film) => film.id}
                    renderItem={(film) => (
                        <FilmCard
                            tmdbID={film.id}
                            title={film.title}
                            posterPath={film.poster_path}
                            providers={film.providers}
                        />
                    )}
                />
            </section>
        </PageLayout>
    );
}
