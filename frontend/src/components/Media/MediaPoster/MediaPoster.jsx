import styles from './MediaPoster.module.css';

import NoPosterImage from '../../../assets/fallbacks/no-poster-image.jpg';

export default function MediaPoster({ imageSRC, title, hoverEffect = false }) {

    const src = imageSRC || NoPosterImage;

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
