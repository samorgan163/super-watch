import styles from './FilmIdentity.module.css';

import MediaTitle from '../../Media/MediaTitle/MediaTitle';
import MediaReleaseInfo from '../../Media/MediaReleaseInfo/MediaReleaseInfo';

export default function FilmIdentity({ poster, title, logo }) {

    return (
        <div className={styles.wrapper}>
            <div className={styles.posterWrapper}>
                <img src={poster} alt="" />
            </div>
            <div className={styles.metaDataWrapper}>
                <MediaTitle 
                    title={title}
                    logo={logo}
                />
                <MediaReleaseInfo 
                    date={'2024'}
                    age={'12'}
                    runtime={'122'}
                />
                <p className={`${styles.director} text-md font-bold text-color-primary`}>Directed by: Goes Here</p>
            </div>
        </div>
    );

}
