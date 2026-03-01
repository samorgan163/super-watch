import styles from './MediaActions.module.css';

// TODO: always show at bottom of page on touch? devices eg. phone, tablet

export default function MediaActions({ children }) {

    if (!children) return null;

    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );

}
