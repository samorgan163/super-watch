import styles from './Streaming.module.css';
import ServiceIcon from '../../ServiceIcon/ServiceIcon';

export default function Streaming({ service }) {
    return (
        <div className={styles.wrapper}>
            {service ? (
                <>
                    <ServiceIcon service={service} />
                    <p className="text-color-primary">Streaming Now</p>
                </>
            ) : (
                <p className="text-color-primary">Not Streaming</p>
            )}
        </div>
    );
}