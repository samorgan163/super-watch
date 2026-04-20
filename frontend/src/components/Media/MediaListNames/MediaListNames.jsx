import styles from './MediaListNames.module.css';

export default function MediaListNames({ names = [] }) {

    if (!Array.isArray(names)) throw Error('Names must be an array');

    const formattedNames = names
        ? names.map(item => item.name).join(', ')
        : 'Unknown';

    return (
        <div className={styles.wrapper}>
            <p className='text-meta'>
                {formattedNames}
            </p>
        </div>
    );

}
