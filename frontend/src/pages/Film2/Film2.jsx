import MetaData from '../../components/Film/MetaData/MetaData'
import Trailer from '../../components/Film/Trailer/Trailer'
import HorizontalScrollRow from '../../components/HorizontalScrollRow/HorizontalScrollRow'
import PageLoading from '../../components/PageLoading/PageLoading'
import PersonCard from '../../components/Cards/PersonCard/PersonCard'

import Streaming from '../../components/Film/Streaming/Streaming'
import WatchlistButton from '../../components/WatchlistButton/WatchlistButton'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { getFilm } from '../../api/film';

import styles from './Film2.module.css'

export default function Film2() {

    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(true);

    const { tmdbId } = useParams();

    useEffect(() => {
        const getResults = async () => {
            try {
                setLoading(true);
                const result = await getFilm(tmdbId);
                setResults(result);
            } catch {
                console.log('Network Error');
            }
            finally {
                setLoading(false);
            }
        }

        getResults();
    }, [ tmdbId ]);

    if (loading) return <PageLoading />;

    return (
        <div className={styles.filmWrapper}>
            <Trailer trailerImageURL={results?.banner} />
            <div className={styles.contentWrapper}>
                <section className={`${styles.metaDataWrapper} section-with-px section-with-mb`}>
                    <MetaData 
                        logo={results?.logo}
                        poster={results?.poster}
                        releaseDate={results.release_date}
                        runtime={results.runtime}
                        overview={results.overview}
                        director={results.director?.[0].name}
                        title={results?.title}
                    />
                    <div className={styles.toolbarWrapper}>
                        <Streaming service={results?.streaming?.[0]} />
                        <WatchlistButton tmdbId={results?.tmdbid}/>
                    </div>
                   
                </section>
                
                <section className='section-with-mb'>
                    <HorizontalScrollRow 
                        title='Top Cast'
                        items={results.top_cast}
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
