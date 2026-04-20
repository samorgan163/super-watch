import styles from './WatchlistButton.module.css';

import { useWatchlist } from '../../hooks';
import Button from '../../../../components/UI/Button/Button';
import EyeIcon from '../../../../components/UI/EyeIcon/EyeIcon';

export default function WatchlistButton({ tmdbId }) {

    const { 
        inWatchlist, 
        isInitialLoading,
        isInitialError,
        isMutationLoading, 
        toggleWatchlist 
    } = useWatchlist(tmdbId);

    const icon = 
        <EyeIcon 
            color={inWatchlist ? 'green' : 'white'}
            size={30}
        />

    return (
        <Button 
            iconOnly 
            icon={icon} 
            disabled={isInitialLoading || isMutationLoading || isInitialError}
            onClick={toggleWatchlist}
        />
    );
    
}
