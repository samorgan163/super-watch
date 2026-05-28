import styles from './TopNavbar.module.css';
import { useEffect, useState, useRef } from 'react';

import { useNavbarSlot } from '../NavbarSlotContext';

export default function TopNavbar({title}) {

    const { slot } = useNavbarSlot();

    const [ hasUserScrolled, setHasUserScrolled ] = useState(false);

    const navbarRef = useRef(null);
    
    // detect if user has scrolled, to adjust nvabar styling
    useEffect(() => {
        const scrollHandler = () => {
            setHasUserScrolled(window.scrollY > 0);
        }
        window.addEventListener('scroll', scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    // calculate the height of navbar for page padding adjustments
    useEffect(() => {
        if (!navbarRef.current) return;

        const element = navbarRef.current;

        const updateHeight = () => {
            document.documentElement.style.setProperty(
                '--navbar-height',
                `${element.offsetHeight}px`
            );
        };
        updateHeight();

        const observer = new ResizeObserver(updateHeight);

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
		<header 
            className={`
                ${styles.navbar}
                ${hasUserScrolled 
                    ? styles.navbarFullOpacity
                    : styles.navbarFadedOpacity
                }
            `}
            ref={navbarRef}
        >
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
            </div>

            {/* additional content slot, injected via context */}
            {slot && (
                <div className={styles.additionalContent}>
                    {slot}
                </div>
            )}

        </header>
    );
}
