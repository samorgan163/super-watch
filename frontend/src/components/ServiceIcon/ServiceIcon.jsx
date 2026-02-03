// services icons
import netflix from '../../assets/icons/service-icons/NETFLIX.png';
import prime from '../../assets/icons/service-icons/PRIME.png';
import bbc from '../../assets/icons/service-icons/BBC.png';
import itvx from '../../assets/icons/service-icons/ITVX.png';
import vue from '../../assets/icons/service-icons/VUE.png';

// css
import styles from './ServiceIcon.module.css';

function ServiceIcon({ service }) {

    const services = new Map([
        ['NETFLIX', netflix],
        ['PRIME', prime],
        ['BBC', bbc],
        ['ITVX', itvx],
        ['VUE', vue]
    ]);

    return (
        <div className={styles.serviceImageWrapper}>
            <img src={services.get(service)} alt={service} />
        </div>
    );

}

export default ServiceIcon;