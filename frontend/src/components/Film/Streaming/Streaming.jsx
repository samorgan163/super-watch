import styles from './Streaming.module.css';
import ServiceIcon from '../../ServiceIcon/ServiceIcon';

export default function Streaming() {

    return (
        <div className={styles.wrapper}>
            <ServiceIcon />
            <p className='text-color-primary'>Streaming Now</p>
        </div>
    );

}