import styles from './MediaTitle.module.css';

export default function MediaTitle({ title, logo }) {
    
    const cleanedTitle = title || 'Unknown';

    const logoAltText = title ? `${title} logo` : 'Film logo';

    return (
        <div className={styles.wrapper}>
            {logo ? (
                <>
                <div className={styles.logoWrapper}>
                    <img loading='lazy' src={logo} alt={logoAltText} />
                </div>

                <h1 className={`${styles.title} text-l font-bold text-color-primary`}>{cleanedTitle}</h1>
                </>
            ) : (
                // Always show title, if no logo
                <h1 className='text-l font-bold text-color-primary'>{cleanedTitle}</h1>
            )}
        </div>
    );
}
