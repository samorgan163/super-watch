import styles from './FilmToolbar.module.css';

import Button from '../../UI/Button/Button';
import ServiceIcon from '../../UI/ServiceIcon/ServiceIcon';
import WatchlistButton from '../../../features/watchlist/components/WatchlistButton/WatchlistButton';

export default function FilmToolbar({ tmdbId, service }) {

    const serviceDisplay = service 
        ?
        <Button as='div' icon={<ServiceIcon service={service} size={30} />}>Streaming Now</Button>
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
