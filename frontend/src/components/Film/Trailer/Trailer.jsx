import styles from "./Trailer.module.css"

export default function Trailer({ title, trailerImageURL }) {

    // No fallback for missing trailer
    if (!trailerImageURL) return null;

    const altText = title ? `${title} banner poster` : 'Film banner poster';

    return (
        <div className={styles.trailerWrapper}>
            <img loading='lazy' src={trailerImageURL} alt={altText} />
        </div>
    )

}
