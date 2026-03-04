import styles from './PersonCard.module.css';
import MediaCard from '../../Media/MediaCard/MediaCard';
import MediaPoster from '../../Media/MediaPoster/MediaPoster';

export default function PersonCard({ tmdbID, name, role, posterPath }) {

    // do not currently have a person page
    const url = '#';

    const cleanedName = name || 'Unknown';

    const cleanedRole = role || 'Unknown';

    const tmdbProfileImageRes = 'w185';

    return (
        <MediaCard
            toURL={url}
            image={
                <MediaPoster 
                    imagePath={posterPath}
                    imageRes={tmdbProfileImageRes}
                    title={name}
                    hoverEffect={true}
                />
            }
            title={cleanedName}
            subText={cleanedRole}
        />
    );

}
