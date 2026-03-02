import { Link } from "react-router-dom";

import styles from './MediaCard.module.css';

import NoPosterImage from '../../../assets/fallbacks/no-poster-image.jpg';

import MediaPoster from "../MediaPoster/MediaPoster";

export default function MediaCard({ 
    toURL = '#', 
    imageSRC = null, 
    title = '', 
    subText = '', 
    serviceOverlay = null, 
}) {

    return (
        <div className={styles.mediaCard}>
            
            <Link to={toURL}>
                <div className={styles.imageWrapper}>
                    {serviceOverlay && (
                        <div className={styles.serviceOverlayWrapper}>
                            {serviceOverlay}
                        </div>
                    )}
                    <MediaPoster imageSRC={imageSRC} title={title} hoverEffect/>
                </div>
            </Link>
            
            <div className={styles.metaDataWrapper}>
                {title && (
                    <p className="text-color-primary">{title}</p>
                )}
                {subText && (
                    <p className="text-color-primary-80">{subText}</p>
                )}
            </div>
          
        </div>
    )

}
