import styles from './HorizontalScrollFilm2.module.css';
import { useRef } from 'react';

export default function HorizontalScrollFilm2() {
    
    const containerRef = useRef(null);

    function scroll(direction) {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        const scrollAmount = container.clientWidth;
        let targetScroll;

        if (direction === 'right') {
            targetScroll = Math.min(container.scrollLeft + scrollAmount, maxScrollLeft);
        } else {
            targetScroll = Math.max(container.scrollLeft - scrollAmount, 0);
        }
        
        containerRef.current.scrollTo({
            left: targetScroll,
            behavior: "smooth",
        });
    }
    
    return (
        <div className={styles.containerWrapper}>
            <button 
                onClick={() => scroll('right')} 
                className={`${styles.scrollBtn} ${styles.scrollBtnRight}`}
            >
                Right
            </button>
            <button 
                onClick={() => scroll('left')}
                className={`${styles.scrollBtn} ${styles.scrollBtnLeft}`}
            >
                Left
            </button>
            <div className={styles.container} ref={containerRef}>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
                <div className={styles.item}>1</div>
            </div>
        </div>
    )

}