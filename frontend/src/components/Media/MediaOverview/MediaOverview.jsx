import styles from './MediaOverview.module.css';

export default function MediaOverview({ overview }) {

    if (!overview) return null;

    return (
        <p className='text-md font-regular text-color-primary'>
            {overview}
        </p>
    );

}