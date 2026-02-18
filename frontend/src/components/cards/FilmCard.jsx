import styles from './FilmCard.module.css';
import ServiceIcon from '../ServiceIcon/ServiceIcon';

import { Link } from 'react-router-dom';

export default function FilmCard({ tmdbID, title, poster, streaming }) {

    return (
        <div className={styles.film}>
            <Link aria-label={title || 'Unknown'} to={`/film/${tmdbID}`}>
                <div className={styles.filmImageWrapper}>
                    <div className={styles.serviceWrapper}>
                        {streaming?.[0] && 
                            <ServiceIcon className={styles.service} service={streaming[0]} />
                        }
                    </div>
                    <img loading="lazy" src={poster} alt="" />
                </div>
            </Link>
            <p>{title}</p>
        </div>
    )

}