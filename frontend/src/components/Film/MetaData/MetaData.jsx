import styles from './MetaData.module.css'

export default function MetaData({ logo, releaseDate, runtime, overview, director }) {

    return (
        <div className={styles.metaDataWrapper}>
            <div className={styles.left}>
                <div className={styles.logoWrapper}>
                    <img src={logo} alt="" />
                </div>
                <p className='text-md font-bold text-color-primary' >
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
                <p className='text-sm font-regular text-color-primary-80'>Directed By</p>
                <p className='text-md font-bold text-color-primary' >{director}</p>
            </div>
            
        </div>
    )

}