import styles from './FilmsGrid.module.css';

export default function FilmsGrid({ title, items, renderItem, getKey, fadeOpacity = false }) {

    return (
        <div className={styles.filmsGridWrapper}>
            {title && 
                <h2 
                    className='text-l font-bold text-color-primary mb-16'
                >
                    {title}
                </h2>
            }
            <div className={styles.filmsGrid}>
                {items.map((item) => (
                    <div 
                        className={ fadeOpacity ? `${styles.film} ${styles.fade}` : styles.film}
                        key={getKey(item)}
                    >
                        {renderItem(item)}
                    </div>
                ))}
            </div>
        </div>
    );

}
