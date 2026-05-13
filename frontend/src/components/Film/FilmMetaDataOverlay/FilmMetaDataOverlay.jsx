import MediaListNames from '../../Media/MediaListNames/MediaListNames';
import MediaReleaseInfo from '../../Media/MediaReleaseInfo/MediaReleaseInfo';
import MediaTitle from '../../Media/MediaTitle/MediaTitle';
import FilmPoster from '../../Posters/FilmPoster/FilmPoster';
import styles from './FilmMetaDataOverlay.module.css';

import WatchlistButton from '@/features/watchlist/components/WatchlistButton/WatchlistButton';

import ServiceIcon from '../../UI/ServiceIcon/ServiceIcon';
import EyeIcon from '../../UI/EyeIcon/EyeIcon';
import FilmToolbar from '../FilmToobar/FilmToolbar';

import MediaOverview from '@/components/Media/MediaOverview/MediaOverview';

export default function FilmMetaDataOverlay({ 
    title,
    logoPath,
    posterPath,
    overview,
    releaseDate,
    ageRating,
    runtime,
    directors,
    providers,
    tmdbID,
}) {

    return (
        <div className={styles.wrapper}>
            <div className={styles.metaDataContainer}>
                <div className={styles.posterContainer}>
                    <FilmPoster posterPath={posterPath} title={title} />
                </div>
                <div className={styles.titleContainer}>
                    <MediaTitle title={title} logoPath={logoPath} />
                    <MediaReleaseInfo 
                        releaseDate={releaseDate}
                        ageRating={ageRating}
                        runtime={runtime}
                    />
                    <MediaListNames
                        people={directors}
                    />
                </div>
                <FilmToolbar 
                    tmdbId={tmdbID}
                    providers={providers}
                />
            </div>
            <div className={styles.overviewContainer}>
                <MediaOverview overview={overview} />
            </div>
        </div>
    );

}
