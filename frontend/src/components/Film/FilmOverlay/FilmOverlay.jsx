import styles from './FilmOverlay.module.css';

import MediaOverview from '../../Media/MediaOverview/MediaOverview';
import MediaActions from '../../Media/MediaActions/MediaActions';
import MediaPoster from '../../Media/MediaPoster/MediaPoster';
import Streaming from '../Streaming/Streaming';
import WatchlistButton from '../../UI/WatchlistButton/WatchlistButton';
import MediaTitle from '../../Media/MediaTitle/MediaTitle';
import MediaReleaseInfo from '../../Media/MediaReleaseInfo/MediaReleaseInfo';
import FilmDirector from '../FilmDirector/FilmDirector';

export default function FilmOverlay({
    tmdbID,
    title,
    poster,
    logo,
    director,
    overview,
    streaming,
    releaseDate,
    ageRating,
    runtime,
}) {

    const tmdbPosterImageRes = 'w342';

    return (
        <div className={styles.wrapper}>
            
            <div className={styles.poster}>
                <MediaPoster imagePath={poster} imageRes={tmdbPosterImageRes} title={title}/>
            </div>

            <div className={styles.meta}>
                <div className={styles.title}>
                    <MediaTitle title={title} logo={logo} />
                </div>

                <div className={styles.releaseInfo}>
                    <MediaReleaseInfo
                        releaseDate={releaseDate}
                        ageRating={ageRating}
                        runtime={runtime}
                    />
                </div>

                <div className={styles.mobileDirector}>
                    <FilmDirector directors={director} />
                </div>
            </div>

            <div className={styles.desktopDirector}>
                <FilmDirector directors={director} />
            </div>

            <div className={styles.overview}>
                <MediaOverview overview={overview} />
            </div>

            <div className={styles.actions}>
                <MediaActions>
                    <Streaming service={streaming?.[0]} />
                    <WatchlistButton tmdbId={tmdbID} />
                </MediaActions>
            </div>
        </div>
    );
}
