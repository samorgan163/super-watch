import styles from './Streaming.module.css';
import ServiceIcon from '../../ServiceIcon/ServiceIcon';

export default function Streaming({ service }) {
    return (
        <div className='button'>
            {service ? (
                <>
                    <ServiceIcon service={service} size={'var(--icon-size-s)'} />
                    <p className="text-color-primary">Streaming Now</p>
                </>
            ) : (
                <p className="text-color-primary">Not Streaming</p>
            )}
        </div>
    );
}
