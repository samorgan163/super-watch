import styles from './PersonCard.module.css';
import MediaCard from '../MediaCard/MediaCard';

export default function PersonCard({ tmdbID, name, role, poster }) {

    // do not currently have a person page
    const url = '#';

    const cleanedName = name || 'Unknown';

    const cleanedRole = role || 'Unknown';

    /* use when you change backend
    const posterPrefixURL = 'https://image.tmdb.org/t/p/w400';
    const posterSRC = poster ? `${posterPrefixURL}${poster}` : null;
    */

    return (
        <MediaCard
            toURL={url}
            imageSRC={poster}
            title={cleanedName}
            subText={cleanedRole}
        />
    );

}
