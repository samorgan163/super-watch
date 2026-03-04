import styles from "./FilmTrailer.module.css"

export default function Trailer({ title, trailerImageURL }) {

    // No fallback for missing trailer
    if (!trailerImageURL) return null;

    const backdropBaseURL = 'https://image.tmdb.org/t/p/w1280';

    const src = `${backdropBaseURL}${trailerImageURL}`;
    const altText = title ? `${title} banner poster` : 'Film banner poster';

    return (
        <div className={styles.trailerWrapper}>
            <img loading='lazy' src={src} alt={altText} />
        </div>
    )

}
