import { Link } from "react-router-dom";

import styles from './MediaCard.module.css';

export default function MediaCard({ 
    toURL, 
    poster, 
    title, 
    subText, 
    serviceOverlay, 
}) {

    return (
        <article className={styles.mediaCard}>
            <Link to={toURL}>
                <div className={styles.visualsWrapper}>
                    {serviceOverlay && (
                        <div className={styles.serviceOverlayWrapper}>
                            {serviceOverlay}
                        </div>
                    )}
                    <div className={styles.posterWrapper}>
                        {poster}
                    </div>
                </div>
                <div className={styles.metaDataWrapper}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                    {subText && <p className={styles.subText}>{subText}</p>}
                </div>
            </Link>
        </article>
    )

}
