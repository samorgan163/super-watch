import styles from './PageLayout.module.css';

export default function PageLayout({
    fullWidth = false,
    fullHeight = false,
    children
}) {

    return (
        <main 
            className={`
                ${styles.page}
                ${fullWidth && styles.fullWidth}
                ${fullHeight && styles.fullHeight}
            `}
        >
            {children}
        </main>
    );

}
