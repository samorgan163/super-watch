import styles from './TopPickCard.module.css';

import banner from '../../../assets/marty-backdrop.jpg';
import logo from '../../../assets/marty-logo.png';

export default function TopPickCard(){

    return (
        <div className={styles.card}>
            <div className={styles.backdropWrapper}>
                <img src={banner} alt="" />
            </div>
            <div className={styles.overlay}>
                <div className={styles.logoWrapper}>
                    <img src={logo} alt="" />
                </div>
                <span className={styles.infoText}>
                    Based on your love of Horror
                </span>
                <div className={styles.btn}>
                    Streaming Now
                </div>
            </div>
            
        </div>
    )

}