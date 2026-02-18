import styles from "./Trailer.module.css"

export default function Trailer({trailerImageURL}) {

    return (
        <div className={styles.trailerWrapper}>
            <img src={trailerImageURL} alt="" />
        </div>
    )

} 