import styles from './MediaPoster.module.css';

import NoPosterImage from '../../../assets/fallbacks/no-poster-image.jpg';

export default function MediaPoster({ 
    imagePath = '', 
    imageRes = 'w400', 
    title = '', 
    hoverEffect = false 
}) {

    const tmdbMediaBaseURL = 'https://image.tmdb.org/t/p/';

    const src = imagePath 
        ? `${tmdbMediaBaseURL}${imageRes}${imagePath}` 
        : NoPosterImage;

    const altText = title ? `${title} poster image` : 'Poster image';

    return (
        <div className={`${styles.wrapper} ${hoverEffect ? styles.hoverable : ''}`}>
            <img 
                loading='lazy' 
                src={src} 
                alt={altText} 
            />
        </div>
    );

}
