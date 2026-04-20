import styles from './MediaReleaseInfo.module.css';

export default function MediaReleaseInfo({ releaseDate, ageRating, runtime }) {

    // extract year from release date
    const releaseYear = releaseDate?.slice(0, 4) || null;

    const items = [
        releaseYear && { label: 'Release year', value: releaseYear },
        ageRating && { label: 'Age rating', value: ageRating },
        runtime && { label: 'Runtime', value: `${runtime} mins` },
    ].filter(Boolean);

    if (items.length === 0) return null;

    return (
        <ul className={styles.wrapper}>
            {items.map((item) => (
                <li 
                    key={item.label} 
                    aria-label={`${item.label}: ${item.value}`}
                    className='text-meta'
                >
                    {item.value}
                </li>
            ))}
        </ul>
    );
    
    /*
    return (
        <div className={styles.wrapper}>
            {releaseYear && (
                <p className='text-md font-bold text-color-primary'>
                    {releaseYear}
                </p>
            )}
            {ageRating && (
                <p className='text-md font-bold text-color-primary'>
                    {ageRating}
                </p>
            )}
            {runtime && (
                <p className='text-md font-bold text-color-primary'>
                    {runtime} mins
                </p>
            )}
        </div>
    );
    */

}
