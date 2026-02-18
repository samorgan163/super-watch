import styles from './PersonCard.module.css';

import { Link } from 'react-router-dom';

export default function FilmCard({ tmdbID, name, role, poster }) {

    return (
        <div className={styles.person}>
            <Link aria-label={name || 'Unknown'} to={`/`}>
                <div className={styles.personImageWrapper}>
                    <img loading="lazy" src={poster} alt="" />
                </div>
            </Link>
            <p>{name || 'Unknown'}</p>
        </div>
    )

}