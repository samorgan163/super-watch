import styles from './ServiceIcon.module.css';

import { TMDB_MEDIA_BASE_URL, TMDB_LOGO_SIZES } from '../../../lib/constants';

export default function ServiceIcon({ name, logoPath, size }) {

    const src = `${TMDB_MEDIA_BASE_URL}${TMDB_LOGO_SIZES.w92}${logoPath}`

    return (
        <img
            style={{ width: size, height: size }}
            className={styles.icon}
            src={src} 
            alt={name} 
        />
    );

}
