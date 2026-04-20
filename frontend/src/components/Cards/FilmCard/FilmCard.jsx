import ServiceIcon from '../../UI/ServiceIcon/ServiceIcon';
import MediaCard from '../MediaCard/MediaCard';

import FilmPoster from '../../Posters/FilmPoster/FilmPoster';

export default function FilmCard({ tmdbID, title, posterPath, streaming }) {

    const url = tmdbID ? `/film/${tmdbID}` : '/404';

    const cleanedTitle = title || 'Unknown';

    const primaryService = streaming?.[0];
    
    return (
        <MediaCard 
            toURL={url}
            poster={
                <FilmPoster
                    posterPath={posterPath}
                    title={cleanedTitle}
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
