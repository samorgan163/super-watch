import MetaData from '../../components/Film/MetaData/MetaData';
import Trailer from '../../components/Film/Trailer/Trailer';
import HorizontalScrollRow from '../../components/HorizontalScrollRow/HorizontalScrollRow';
import PageLoading from '../../components/PageLoading/PageLoading';
import PageRetry from '../../components/PageRetry/PageRetry';
import PersonCard from '../../components/Cards/PersonCard/PersonCard';
import Streaming from '../../components/Film/Streaming/Streaming';
import WatchlistButton from '../../components/WatchlistButton/WatchlistButton';

import { useParams } from 'react-router-dom';

import styles from './Film.module.css';
import { useFetch } from '../../hooks/useFetch';
import { getFilm } from '../../api/film';

export default function Film() {

    // get tmdbID from route params
    const { tmdbID } = useParams();

    const { loading, error, data, retry } = useFetch(
        () => getFilm(tmdbID), [tmdbID]
    );

    if (loading) return <PageLoading />;

    if (error) return <PageRetry retryAction={retry} />;

    return (
        <div className={styles.filmWrapper}>
            <Trailer trailerImageURL={data?.banner} />
            <div className={styles.contentWrapper}>
                <section className={`${styles.metaDataWrapper} section-with-px section-with-mb`}>
                    <MetaData 
                        logo={data?.logo}
                        poster={data?.poster}
                        releaseDate={data.release_date}
                        runtime={data.runtime}
                        overview={data.overview}
                        director={data.director?.[0].name}
                        title={data?.title}
                    />
                    <div className={styles.toolbarWrapper}>
                        <Streaming service={data?.streaming?.[0]} />
                        <WatchlistButton tmdbId={data?.tmdbid}/>
                    </div>
                   
                </section>
                
                <section className='section-with-mb'>
                    <HorizontalScrollRow 
                        title='Top Cast'
                        items={data.top_cast}
                        getKey={(person) => person.id}
                        renderItem={(person) => (
                            <PersonCard
                                tmdbID={person.id}
                                name={person.name}
                                role={person.role}
                                poster={person.poster}
                            />
                        )}
                    />
                </section>
               
            </div>
        </div>
    )

}
