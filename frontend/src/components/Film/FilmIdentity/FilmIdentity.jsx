import styles from './FilmIdentity.module.css';

import MediaTitle from '../../Media/MediaTitle/MediaTitle';
import MediaReleaseInfo from '../../Media/MediaReleaseInfo/MediaReleaseInfo';

export default function FilmIdentity({ poster, title, logo }) {

    return (
        <div className={styles.wrapper}>
            <div className={styles.posterWrapper}>
                <img loading='lazy' src={poster} alt={title ? `${title} poster` : 'Film poster'} />
            </div>
            <div className={styles.metaDataWrapper}>
                <MediaTitle 
                    title={title}
                    logo={logo}
                />
                <MediaReleaseInfo 
                    releaseDate={'2024'}
                    ageRating={'12'}
                    runtime={'122'}
                />
                <p className={`${styles.director} text-md font-bold text-color-primary`}>Directed by: Goes Here</p>
            </div>
        </div>
    );

}
