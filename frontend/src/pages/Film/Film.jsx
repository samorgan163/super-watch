import MetaData from '../../components/Film/MetaData/MetaData';
import Trailer from '../../components/Film/Trailer/Trailer';
import HorizontalScrollRow from '../../components/HorizontalScrollRow/HorizontalScrollRow';
import PageLoading from '../../components/PageLoading/PageLoading';
import PageRetry from '../../components/PageRetry/PageRetry';
import PersonCard from '../../components/Cards/PersonCard/PersonCard';
import Streaming from '../../components/Film/Streaming/Streaming';
import WatchlistButton from '../../components/WatchlistButton/WatchlistButton';

import { useParams } from 'react-router-dom';

import { useFilm } from '../../hooks/useFilm';

import styles from './Film.module.css';

export default function Film() {

    const { tmdbID } = useParams();

    const { loading, error, filmData, getData } = useFilm(tmdbID);

    if (loading) return <PageLoading />;

    if (error) return <PageRetry retryAction={getData} />;

    return (
        <div className={styles.filmWrapper}>
            <Trailer trailerImageURL={filmData?.banner} />
            <div className={styles.contentWrapper}>
                <section className={`${styles.metaDataWrapper} section-with-px section-with-mb`}>
                    <MetaData 
                        logo={filmData?.logo}
                        poster={filmData?.poster}
                        releaseDate={filmData.release_date}
                        runtime={filmData.runtime}
                        overview={filmData.overview}
                        director={filmData.director?.[0].name}
                        title={filmData?.title}
                    />
                    <div className={styles.toolbarWrapper}>
                        <Streaming service={filmData?.streaming?.[0]} />
                        <WatchlistButton tmdbId={filmData?.tmdbid}/>
                    </div>
                   
                </section>
                
                <section className='section-with-mb'>
                    <HorizontalScrollRow 
                        title='Top Cast'
                        items={filmData.top_cast}
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
