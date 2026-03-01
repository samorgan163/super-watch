import styles from './MediaReleaseInfo.module.css';

export default function MediaReleaseInfo({ date, age, runtime }) {

    const releaseYear = date?.slice(0, 4);

    return (
        <p className='text-md font-bold text-color-primary'>
            {releaseYear}
            &nbsp;&nbsp;&bull;&nbsp;&nbsp;
            {age}
            &nbsp;&nbsp;&bull;&nbsp;&nbsp;
            {runtime ? `${runtime} mins` : ''}
        </p>
    );

}
