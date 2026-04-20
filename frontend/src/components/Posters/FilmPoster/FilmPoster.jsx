import styles from './FilmPoster.module.css';
import posterFallback from '../../../assets/fallbacks/no-poster-image.jpg';

import { TMDB_MEDIA_BASE_URL, TMDB_POSTER_SIZES } from '../../../lib/constants';

export default function FilmPoster({ 
    posterPath,
    title,
}) {

    const src = posterPath 
        ? `${TMDB_MEDIA_BASE_URL}${TMDB_POSTER_SIZES.w342}${posterPath}` 
        : posterFallback;

    const altText = title ? `Poster of ${title}` : 'Film poster';

    const srcSet = posterPath
        ? [
            `${TMDB_MEDIA_BASE_URL}${TMDB_POSTER_SIZES.w92}${posterPath} 92w`,
            `${TMDB_MEDIA_BASE_URL}${TMDB_POSTER_SIZES.w154}${posterPath} 154w`,
            `${TMDB_MEDIA_BASE_URL}${TMDB_POSTER_SIZES.w185}${posterPath} 185w`,
            `${TMDB_MEDIA_BASE_URL}${TMDB_POSTER_SIZES.w342}${posterPath} 342w`,
            `${TMDB_MEDIA_BASE_URL}${TMDB_POSTER_SIZES.w500}${posterPath} 500w`,
            `${TMDB_MEDIA_BASE_URL}${TMDB_POSTER_SIZES.w780}${posterPath} 780w`,
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
