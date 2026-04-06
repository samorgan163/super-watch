// service icons
import netflix from '../../../assets/icons/service-icons/NETFLIX.png'
import prime from '../../../assets/icons/service-icons/PRIME.png';
import bbc from '../../../assets/icons/service-icons/BBC.png';
import itvx from '../../../assets/icons/service-icons/ITVX.png';
import vue from '../../../assets/icons/service-icons/VUE.png';

import styles from './ServiceIcon.module.css';

export default function ServiceIcon({ service, size }) {

    const SERVICE_ICONS = {
        NETFLIX: netflix,
        PRIME: prime,
        BBC: bbc,
        ITVX: itvx,
        VUE: vue,
    };

    const serviceIcon = SERVICE_ICONS[service];

    if (!serviceIcon) return null;

    return (
        <div className={styles.serviceImageWrapper}>
            <img
                style={{ width: size, height: size }}
                className='media-img media-img-border'
                src={serviceIcon} 
                alt={service} 
            />
        </div>
    );

}
