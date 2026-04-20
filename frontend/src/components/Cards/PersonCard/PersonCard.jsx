import styles from './PersonCard.module.css';
import MediaCard from '../MediaCard/MediaCard';
import PersonPoster from '../../Posters/PersonPoster/PersonPoster';

export default function PersonCard({ tmdbID, name, role, posterPath }) {

    // do not currently have a person page
    const url = '#';

    const cleanedName = name || 'Unknown';

    const cleanedRole = role || 'Unknown';

    return (
        <MediaCard
            toURL={url}
            poster={
                <PersonPoster
                    profilePath={posterPath}
                    name={cleanedName}
                    hoverEffect={true}
                />
            }
            title={cleanedName}
            subText={cleanedRole}
        />
    );

}
