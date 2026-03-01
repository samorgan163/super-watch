import styles from './FilmDirector.module.css';

export default function FilmDirector({ directors = [] }) {

    let directorsFormatted = 'Unknown';

    if (directors.length === 1) {
        directorsFormatted = directors[0].name;
    }
    else if (directors.length > 1) {
        directorsFormatted = directors
            .map(director => director.name)
            .join(', ');
    }

    return (
        <div className={styles.wrapper}>
            <span className='font-regular text-sm text-color-primary-80'>
                From
            </span>
            <p className='font-bold text-md text-color-primary'>
                {directorsFormatted}
            </p>
        </div>
    );

}
