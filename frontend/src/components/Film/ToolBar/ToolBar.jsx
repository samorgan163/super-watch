import styles from './ToolBar.module.css';
import WatchlistButtom from '../../WatchlistButton/WatchlistButton'
import Streaming from '../Streaming/Streaming';

export default function ToolBar() {

    return (
        <div className={styles.wrapper}>
            <div className={styles.streamingContainer}>
                <Streaming />
            </div>
            <div className={styles.watchlistButtonContainer}>
                <WatchlistButtom />
            </div>
            
        </div>
    );

}