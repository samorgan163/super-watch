import styles from './MediaActions.module.css';

export default function MediaActions({ children }) {

    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );

}