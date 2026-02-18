import styles from './MetaData.module.css'

export default function MetaData({ logo, releaseDate, runtime, overview, director }) {

    return (
        <div className={styles.metaDataWrapper}>
            <div className={styles.left}>
                <div className={styles.logoWrapper}>
                    <img src={logo} alt="" />
                </div>
                <p>
                    {releaseDate?.slice(0,4)}
                    &nbsp;&nbsp;&bull;&nbsp;&nbsp;
                    Age&nbsp;&nbsp;&bull;&nbsp;&nbsp;
                    {runtime} mins
                </p>
                <p className={styles.overview}>
                    {overview}
                </p>
            </div>
            <div className={styles.right}>
                <p>Directed By</p>
                <p>{director}</p>
            </div>
            
        </div>
    )

}