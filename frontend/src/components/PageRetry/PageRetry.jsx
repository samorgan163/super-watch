import { IoReloadOutline } from "react-icons/io5";
import styles from './PageRetry.module.css';

export default function PageRetry({ retryAction }) {
    return (
        <div className={styles.pageLoadingWrapper}>
            <button onClick={retryAction}>
                <IoReloadOutline
                    color={'var(--color-text-primary)'}
                    size={30}
                    aria-label="Loading Spinner"
                />
            </button>
        </div>
    );
}
