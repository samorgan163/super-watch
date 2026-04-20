import styles from './MediaTitle.module.css';

import { TMDB_MEDIA_BASE_URL } from '../../../lib/constants';

/**
 * Displays a title logo on large screen and title text on small screen.
 * If no logo provided, always shows title text.
 * 
 * @param {*} param0 
 * @returns 
 */
export default function MediaTitle({ title, logoPath }) {
    
    const cleanedTitle = title || 'Unknown';

    const logoSrc = logoPath
        ? `${TMDB_MEDIA_BASE_URL}w500${logoPath}`
        : null;

    const logoAlt = title ? `Logo of ${title}` : 'Media logo';

    return (
        <div className={styles.wrapper} data-has-logo={!!logoPath}>
            {logoPath && (
                <div className={styles.logoWrapper}>
                    <img loading='lazy' src={logoSrc} alt={logoAlt} />
                </div>
            )}

            <h1 className={styles.title}>{cleanedTitle}</h1>
        </div>
    );
}
