import styles from './MediaOverview.module.css';

export default function MediaOverview({ overview }) {

    return (
        <p className='text-md font-regular text-color-primary'>
            {overview}
        </p>
    );

}