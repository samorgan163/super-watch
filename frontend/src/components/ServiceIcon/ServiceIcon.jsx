// service icons
import netflix from '../../assets/icons/service-icons/NETFLIX.png';
import prime from '../../assets/icons/service-icons/PRIME.png';
import bbc from '../../assets/icons/service-icons/BBC.png';
import itvx from '../../assets/icons/service-icons/ITVX.png';
import vue from '../../assets/icons/service-icons/VUE.png';

import styles from './ServiceIcon.module.css';

function ServiceIcon({ service, size }) {

    const services = new Map([
        ['NETFLIX', netflix],
        ['PRIME', prime],
        ['BBC', bbc],
        ['ITVX', itvx],
        ['VUE', vue]
    ]);

    return (
        <div className={styles.serviceImageWrapper}>
            <img
                style={{ width: size, height: size }}
                className='media-img media-img-border'
                src={services.get(service)} 
                alt={service} 
            />
        </div>
    );

}

export default ServiceIcon;
