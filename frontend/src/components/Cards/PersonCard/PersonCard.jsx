import styles from './PersonCard.module.css';

import { Link } from 'react-router-dom';

export default function FilmCard({ tmdbID, name, role, poster }) {

    return (
        <div className={styles.person}>
            <Link 
                aria-label={name ? `Link to ${name} page` : 'Link to person page'}
                to={`#`}
            >
                <div className={styles.personImageWrapper}>
                    <img 
                        loading="lazy" 
                        src={poster} 
                        alt={name ? `Picture of ${name}` : 'Picture of person'}
                        className='media-img media-img-border'
                    />
                </div>
            </Link>
            <p className='text-color-primary font-regular text-md'>
                {name ? name : 'Unknown'}
            </p>
        </div>
    )

}
