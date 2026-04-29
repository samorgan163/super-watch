import SuperWatchLogo from '../../../../components/UI/SuperWatchLogo/SuperWatchLogo';
import styles from './AuthNav.module.css';

export default function AuthNav() {

    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <SuperWatchLogo />
                </li>
            </ul>
        </nav>
    );

}
