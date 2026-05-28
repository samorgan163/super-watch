import styles from './Dashboard.module.css';
import PageLayout from '../../../layouts/PageLayout/PageLayout';
import PageLoading from '../../../components/UI/PageLoading/PageLoading';
import PageRetry from '../../../components/UI/PageRetry/PageRetry';

import TopPickCard from '../components/TopPickCard';
import MediaScrollRow from '../../../components/Media/MediaScrollRow/MediaScrollRow';
import FilmCard from '../../../components/Cards/FilmCard/FilmCard';

import { useDashboardPage } from '../hooks';

export default function Dashboard() {

    const { isLoading, isError, data, error, refetch } = useDashboardPage();
    
    if (isLoading) return <PageLoading />;

    if (isError) return <PageRetry retryAction={refetch} />;

    return (
        <PageLayout fullWidth >
            <div className={styles.content}>
                <section className={styles.billboardWrapper}>
                    <div className={styles.billboard}>
                        <TopPickCard />
                    </div>
                </section>
                <section>
                    <MediaScrollRow 
                        title='Streaming From Your Watchlist'
                        items={data?.streaming_watchlist}
                        getKey={(film) => film?.id}
                        renderItem={(film) => (
                            <FilmCard
                                tmdbID={film?.id}
                                /*title={film?.title}*/
                                posterPath={film?.poster_path}
                                providers={film?.providers}
                            />
                        )}
                    />
                </section>
                <section>
                    <MediaScrollRow 
                        title='Popular Films'
                        items={data?.popular_films?.results}
                        getKey={(film) => film?.tmdbid}
                        renderItem={(film) => (
                            <FilmCard
                                tmdbID={film?.tmdbid}
                                title={film?.title}
                                posterPath={film?.poster}
                                streaming={film?.streaming}
                            />
                        )}
                    />
                </section>
            </div>
        </PageLayout>
    );

}