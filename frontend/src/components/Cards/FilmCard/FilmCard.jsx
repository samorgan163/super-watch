import ServiceIcon from '../../UI/ServiceIcon/ServiceIcon';
import MediaCard from '../MediaCard/MediaCard';

import FilmPoster from '../../Posters/FilmPoster/FilmPoster';

export default function FilmCard({ tmdbID, title, posterPath, providers }) {

    const url = tmdbID ? `/film/${tmdbID}` : '/404';

    const cleanedTitle = title || 'Unknown';

    const hasProviders = providers?.length > 0;
    
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
                hasProviders && (
                    <ServiceIcon 
                        name={providers[0].provider_name}
                        logoPath={providers[0].logo_path}
                        size={'var(--icon-size-s)'} 
                    />
                )
            }
        />
    )

}
