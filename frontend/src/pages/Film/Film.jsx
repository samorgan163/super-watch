
import imdb from '../../assets/icons/ratings-icons/imdb.png';
import tomato from '../../assets/icons/ratings-icons/tomato.png';
import popcorn from '../../assets/icons/ratings-icons/popcorn.png';

import styles from './Film.module.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import WatchlistButton from '../../components/WatchlistButton/WatchlistButton';
import ServiceIcon from '../../components/ServiceIcon/ServiceIcon'

export default function Film() {

    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(false);

    const [cinemaData, setCinemaData] = useState({});

    const { tmdbId } = useParams();

    useEffect(() => {
        setLoading(true);

        const getResults = async () => {
            try {
                const response = await fetch(`http://192.168.0.77:3000/film/${encodeURIComponent(tmdbId)}`, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const result = await response.json();
                    setResults(result);
                }

            } catch {
                console.log('Network Error');
            }
        }

        getResults();
    }, []);

    return (
        <>

            <div className={styles.bottomTools}>
                {results.streaming && results.streaming.length > 0 
                    ?
                    <div className={styles.serviceContainer}>
                        <ServiceIcon service={results?.streaming[0]} />
                        <span>Streaming Now</span>
                    </div>
                    : 
                    <div className={styles.serviceContainer}>
                        <span>Not Streaming</span>
                    </div>
                }
                <WatchlistButton tmdbId={tmdbId} />
            </div>

            <div className={styles.bottomToolsBlur}></div>

            <div className={styles.trailerWrapper}>
                <div id="banner-poster-wrapper" className={styles.bannerPosterWrapper}>
                    <img src={results.banner} alt="" />
                </div>
            </div>
            
            <div id="content-wrapper" className={styles.contentWrapper} data-tmdbid="<%= locals.filmDetails.tmdbid %>">
                
                <div className={styles.overviewContentWrapper}>
                    <div className={styles.posterWrapper}>
                        <img src={results?.poster} alt="" />
                    </div>
                    <div className={styles.metaDataWrapper}>
                        <h2>{results.title}</h2>
                        <p className={styles.info}>
                            {results.release_date?.slice(0,4)}
                            &nbsp;&nbsp;&bull;&nbsp;&nbsp;
                            Age&nbsp;&nbsp;&bull;&nbsp;&nbsp;
                            {results.runtime} mins
                        </p>
                        <div className={styles.roleWrapper}>
                            <p className={styles.title}>By</p>
                            <div className={styles.dirWrapper}>
                                {results.director?.map((d, i) => (
                                    <p key={i} className={styles.name}>
                                        {d.name}{i < results.director.length - 1 && ', '}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.genreWrapper}>
                    {/*<p>{results?.genres?.join('\u00A0\u00A0\u2022\u00A0\u00A0')}</p>*/}
                    {results?.genres?.map((genre, index) => (
                        <p key={index}>{genre}</p>
                    ))}
                </div>

                <div className={styles.synopsisWrapper}>
                    <p className={styles.synopsis}>
                        {results.overview}
                    </p>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.ratingsWrapper}>
                    <div className={styles.ratingContainer}>
                        <img className={styles.ratingIcon} src={imdb} alt="" />
                        <div className={styles.ratingValue}>
                            <span className={styles.value}>{results?.ratings?.[0]?.value || '?'}</span>
                            <span id={styles.imdbApendage} className={styles.apendage}>/10</span>
                        </div>
                        <span className={styles.count}>{results?.ratings?.[0]?.votes || '?'}</span>
                    </div>
                    <div className={styles.ratingContainer}>
                        <img className={styles.ratingIcon} src={tomato} alt="" />
                        <div className={styles.ratingValue}>
                            <span className={styles.value}>{results?.ratings?.[4]?.value || '?'}</span>
                            <span className={styles.apendage}>%</span>
                        </div>
                        <span className={styles.count}>{results?.ratings?.[4]?.votes || '?'}</span>
                    </div>
                    <div className={styles.ratingContainer}>
                        <img className={styles.ratingIcon} src={popcorn} alt="" />
                        <div className={styles.ratingValue}>
                            <span className={styles.value}>{results?.ratings?.[5]?.value || '?'}</span>
                            <span className={styles.apendage}>%</span>
                        </div>
                        <span className={styles.count}>{results?.ratings?.[5]?.votes || '?'}</span>
                    </div>
                    <div className={styles.ratingContainer}>
                        <span className={styles.metacriticIcon}>{results?.ratings?.[1]?.value || '?'}</span>
                        <span className={styles.metacritic}>Metascore</span>
                        <span className={styles.count}>{results?.ratings?.[1]?.votes || '?'}</span>
                    </div>
                </div>

                {/*results.streaming?.length > 0 &&
                <>
                    <div className={styles.divider}></div>
                    <div className={styles.serviceWrapper}>
                        {results.streaming?.map(service => (
                            <ServiceIcon service={service} />
                        ))}
                    </div>
                </>
                */}   
                

                <div className={styles.peopleWrapper}>
                    <div className={styles.divider}></div>
                    <p className={styles.title}>Cast</p>
                    <div className={styles.castGrid}>
                        {results.top_cast?.map(cast => (
                            <div key={cast.id} className={styles.cast}>
                                <div className={styles.castImageWrapper}>
                                    <img src={`https://image.tmdb.org/t/p/w400${cast.poster}`} alt="" />
                                </div>
                                <p className={styles.name}>{cast.name}</p>
                                <p className={styles.character}>{cast.role}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.crewWrapper}>
                        <p>Director:</p>
                        {results.director?.map((d, i) => (
                            <p key={i} className={styles.name}>
                                {d.name}{i < results.director.length - 1 && ', '}
                            </p>
                        ))}
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.crewWrapper}>
                        <p>Screen Play:</p>
                        <p className={styles.name}>Need To, Do This</p>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.crewWrapper}>
                        <p>All Cast & Crew</p>
                    </div>
                    <div className={styles.divider}></div>
                </div>

            </div>
        </>
    );
    
}
