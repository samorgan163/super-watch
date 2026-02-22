import styles from './MetaData.module.css'

function ReleaseInfo({ releaseDate, age, runtime }) {

    const formattedDate = releaseDate?.slice(0,4) || 'Unknown' // extract the year

    return (
        <>
            {formattedDate}
            &nbsp;&nbsp;&bull;&nbsp;&nbsp;
            {age}
            &nbsp;&nbsp;&bull;&nbsp;&nbsp;
            {runtime} mins
        </>
    )

}

export default function MetaData({ 
    title, 
    logo, 
    poster, 
    releaseDate, 
    runtime, 
    overview, 
    director 
}) {

    return (
        <div className={styles.metaDataWrapper}>
            <div className={styles.left}>
                <div className={styles.logoWrapper}>
                    <img src={logo} alt={title ? `${title} logo` : 'Film logo'} />
                </div>
                <div className={styles.mobileMetaData}>
                    <div className={styles.posterWrapper}>
                        <img src={poster} alt={title ? `${title} poster` : 'Film poster'} />
                    </div>
                    <div className={styles.metaData}>
                        <p className='text-l font-bold text-color-primary mb-4'>{title}</p>
                        <p className='text-xs font-normal text-color-primary mb-16' >
                            <ReleaseInfo 
                                releaseDate={releaseDate}
                                age='Age'
                                runtime={runtime}
                            />
                        </p>
                        <div className={styles.director}>
                            <p className='text-xs font-regular text-color-primary-80'>From</p>
                            <p className='text-md font-bold text-color-primary' >{director}</p>
                        </div>
                    </div>
                </div>
                <p className={`${styles.releaseDetailsLarge} text-md font-bold text-color-primary`} >
                    <ReleaseInfo 
                        releaseDate={releaseDate}
                        age='Age'
                        runtime={runtime}
                    />
                </p>
                <p className='text-md font-regular text-color-primary'>
                    {overview}
                </p>
            </div>
            <div className={styles.right}>
                <div className={styles.directorDesktop}>
                    <p className='text-sm font-regular text-color-primary-80 mb-8'>Directed By</p>
                    <p className='text-l font-bold text-color-primary' >{director}</p>
                </div>
            </div>
            
        </div>
    )

}
