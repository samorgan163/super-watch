import styles from './MetaData.module.css'

export default function MetaData() {

    return (
        <div className={styles.metaDataWrapper}>
            <div className={styles.left}>
                <div className={styles.logoWrapper}>
                    <img src="./src/assets/marty-logo.png" alt="" />
                </div>
                <p>2025 - 15 - 122mins</p>
                <p className={styles.overview}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Iste, autem eum, incidunt facilis maxime quasi ea corrupti beatae illo magnam repellendus, 
                    quod odit itaque. Nam, dolorem temporibus. Odio, repudiandae impedit.
                </p>
            </div>
            <div className={styles.right}>
                <p>Directed By</p>
                <p>Sam Raimi</p>
            </div>
            
        </div>
    )

}