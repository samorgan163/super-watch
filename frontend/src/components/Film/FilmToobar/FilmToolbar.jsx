import styles from './FilmToolbar.module.css';

import Button from '../../UI/Button/Button';
import ServiceIcon from '../../UI/ServiceIcon/ServiceIcon';
import WatchlistButton from '../../../features/watchlist/components/WatchlistButton/WatchlistButton';

export default function FilmToolbar({ tmdbId, providers }) { 

    const serviceDisplay = providers?.length > 0
        ?
            <Button 
                as='div' 
                icon={
                    <ServiceIcon 
                        name={providers[0].provider_name}
                        logoPath={providers[0].logo_path}
                        size={30} 
                    />  
                }
            >
                {providers[0].provider_name}
            </Button>
        :
            <Button as='div'>Currently Unavailable</Button>

    return (
        <ul className={styles.toolbar}>
            <li>
                {serviceDisplay}
            </li>
            <li>
                <WatchlistButton tmdbId={tmdbId} />
            </li>
        </ul>
    );

}
