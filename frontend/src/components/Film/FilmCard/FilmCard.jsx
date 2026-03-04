import styles from './FilmCard.module.css';
import ServiceIcon from '../../UI/ServiceIcon/ServiceIcon';
import MediaCard from '../../Media/MediaCard/MediaCard';
import MediaPoster from '../../Media/MediaPoster/MediaPoster';

export default function FilmCard({ tmdbID, title, posterPath, streaming }) {

    const url = tmdbID ? `/film/${tmdbID}` : '/404';

    const cleanedTitle = title || 'Unknown';

    const primaryService = streaming?.[0] || null;

    const tmdbPosterImageRes = 'w342';

    return (
        <MediaCard 
            toURL={url}
            image={
                <MediaPoster 
                    imagePath={posterPath}
                    imageRes={tmdbPosterImageRes}
                    title={title}
                    hoverEffect={true}
                />
            }
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
    )

}
