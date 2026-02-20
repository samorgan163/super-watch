import styles from './MetaData.module.css'

export default function MetaData({ title, logo, poster, releaseDate, runtime, overview, director }) {

    return (
        <div className={styles.metaDataWrapper}>
            <div className={styles.left}>
                <div className={styles.logoWrapper}>
                    <img src={logo} alt="" />
                </div>
                <div className={styles.mobileMetaData}>
                    <div className={styles.posterWrapper}>
                        <img src={poster} alt="" />
                    </div>
                    <div className={styles.metaData}>
                        <p className='text-l font-bold text-color-primary mb-4'>{title}</p>
                        <p className='text-xs font-normal text-color-primary mb-16' >
                            {releaseDate?.slice(0,4)}
                            &nbsp;&nbsp;&bull;&nbsp;&nbsp;
                            Age&nbsp;&nbsp;&bull;&nbsp;&nbsp;
                            {runtime} mins
                        </p>
                        <div className={styles.director}>
                            <p className='text-xs font-regular text-color-primary-80'>From</p>
                            <p className='text-md font-bold text-color-primary' >{director}</p>
                        </div>
                    </div>
                </div>
                <p className={`${styles.releaseDetailsLarge} text-md font-bold text-color-primary`} >
                    {releaseDate?.slice(0,4)}
                    &nbsp;&nbsp;&bull;&nbsp;&nbsp;
                    Age&nbsp;&nbsp;&bull;&nbsp;&nbsp;
                    {runtime} mins
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