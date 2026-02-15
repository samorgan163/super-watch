import styles from './HorizontalScrollFilm2.module.css';
import ServiceIcon from '../ServiceIcon/ServiceIcon';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HorizontalScrollFilm2({ films, title }) {
    
    const containerRef = useRef(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

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

    const updateScrollButtons = () => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(container.scrollLeft < maxScrollLeft);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        
        updateScrollButtons();

        container.addEventListener("scroll", updateScrollButtons);
        window.addEventListener("resize", updateScrollButtons);

        return () => {
            container.removeEventListener("scroll", updateScrollButtons);
            window.removeEventListener("resize", updateScrollButtons);
        }

    }, []);

    return (
        <div className={styles.containerWrapper}>
            <h2>{title}</h2>
            <button 
                onClick={() => scroll('right')} 
                className={`${styles.scrollBtn} ${styles.scrollBtnRight}`}
                disabled={!canScrollRight}
            >
                <svg
                    className={styles.icon}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M8 5L16 12L8 19" />
                </svg>
            </button>
            <button 
                onClick={() => scroll('left')}
                className={`${styles.scrollBtn} ${styles.scrollBtnLeft}`}
                disabled={!canScrollLeft}
            >
                <svg
                    className={styles.icon}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M16 5 L8 12 L16 19" />
                </svg>
            </button>
            <div className={styles.container} ref={containerRef}>
                {films?.map((film) => (
                    <div className={styles.film} key={film?.tmdbid}>
                        <Link aria-label={film?.title} to={`/film/${film?.tmdbid}`}>
                            <div className={styles.filmImageWrapper}>
                                <div className={styles.serviceWrapper}>
                                    {film.streaming?.[0] && 
                                        <ServiceIcon className={styles.service} service={film.streaming[0]} />
                                    }
                                </div>
                                <img loading="lazy" src={film?.poster} alt="" />
                            </div>
                        </Link>
                        <p>{film?.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )

}