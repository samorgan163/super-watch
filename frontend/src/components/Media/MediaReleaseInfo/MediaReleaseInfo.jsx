import styles from './MediaReleaseInfo.module.css';

export default function MediaReleaseInfo({ releaseDate, ageRating, runtime }) {

    // extract year from release date
    const releaseYear = releaseDate?.slice(0, 4) || null;
    
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

}
