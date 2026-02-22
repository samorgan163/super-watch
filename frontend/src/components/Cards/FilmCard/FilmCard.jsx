import styles from './FilmCard.module.css';
import ServiceIcon from '../../ServiceIcon/ServiceIcon';

import { Link } from 'react-router-dom';

export default function FilmCard({ tmdbID, title, poster, streaming }) {

    return (
        <div className={styles.film}>
            <Link 
                aria-label={title ? `Link to ${title} page` : 'Link to film page'}
                to={`/film/${tmdbID}`}
            >
                <div className={styles.filmImageWrapper}>
                    <div className={styles.serviceWrapper}>
                        {streaming?.[0] && 
                            <ServiceIcon className={styles.service} service={streaming[0]} />
                        }
                    </div>
                    <img 
                        loading="lazy" 
                        src={poster || './src/assets/icons/no-film-image.jpg'} 
                        alt={title ? `${title} poster` : 'Film poster'}
                        className='media-img media-img-border'
                     />
                </div>
            </Link>
        </div>
    )

}
