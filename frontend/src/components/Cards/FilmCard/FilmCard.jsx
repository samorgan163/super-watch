import styles from './FilmCard.module.css';
import ServiceIcon from '../../ServiceIcon/ServiceIcon';
import MediaCard from '../MediaCard/MediaCard';

export default function FilmCard({ tmdbID, title, poster, streaming }) {

    const url = tmdbID ? `/film/${tmdbID}` : '/404';

    const cleanedTitle = title || 'Unknown';

    const primaryService = streaming?.[0] || null;

    /* use when you change backend
    const posterPrefixURL = 'https://image.tmdb.org/t/p/w400';
    const posterSRC = poster ? `${posterPrefixURL}${poster}` : null;
    */

    return (

        <MediaCard 
            toURL={url}
            imageSRC={poster}
            title={cleanedTitle}
            serviceOverlay={
                primaryService && (
                    <ServiceIcon 
                        service={primaryService}
                        size={'var(--icon-size-s)'} 
                    />
                )
            }
        />

    );

}
