import styles from "./Trailer.module.css"

export default function Trailer({ trailerImageURL }) {

    return (
        <div className={styles.trailerWrapper}>
            <img 
                className="media-img"
                src={trailerImageURL} 
                alt="Large poster of Film" 
            />
        </div>
    )

}
