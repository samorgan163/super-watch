import styles from './PersonPoster.module.css';
import posterFallback from '../../../assets/fallbacks/no-poster-image.jpg';

import { TMDB_MEDIA_BASE_URL, TMDB_PROFILE_SIZES } from '../../../lib/constants';

export default function PersonPoster({ 
    profilePath,
    name,
}) {

    const src = profilePath 
        ? `${TMDB_MEDIA_BASE_URL}${TMDB_PROFILE_SIZES.w185}${profilePath}` 
        : posterFallback;

    const altText = name ? `Poster of ${name}` : 'Person poster';

    const srcSet = profilePath
            ? [
                `${TMDB_MEDIA_BASE_URL}${TMDB_PROFILE_SIZES.w45}${profilePath} 45w`,
                `${TMDB_MEDIA_BASE_URL}${TMDB_PROFILE_SIZES.w185}${profilePath} 185w`,
                `${TMDB_MEDIA_BASE_URL}${TMDB_PROFILE_SIZES.h632}${profilePath} 500w`,
            ].join(', ')
            : undefined;

    return (
        <img 
            className={styles.poster}
            loading='lazy'
            src={src}
            srcSet={srcSet}
            sizes='100%' // TODO: component is used in various contexts with different sizes, not sure how to handle this
            alt={altText}
            onError={(e) => e.currentTarget.src = posterFallback}
        />
    );

}
