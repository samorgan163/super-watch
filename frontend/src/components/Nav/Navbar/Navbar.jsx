import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { useEffect, useRef, useState } from 'react';

import { useNavbarSlot } from '../NavbarSlotContext';

export default function Navbar() {

    const { slot } = useNavbarSlot();

    const [ hasUserScrolled, setHasUserScrolled ] = useState(false);

    const navbarRef = useRef(null);

    // check if user has scrolled
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
        <nav
            ref={navbarRef}
            className={`
                ${styles.navbar}
                ${hasUserScrolled 
                    ? styles.navbarFullOpacity
                    : styles.navbarFadedOpacity
                }
            `}
        >
            <div className={styles.content}>
                <div className={styles.left}>
                    <h1 className={styles.logo}>SuperWatch</h1>
                    <ul className={styles.primary} aria-label="Main navigation">
                        <li>
                            <NavLink 
                                key="Dashboard" 
                                to="/" 
                                aria-label="Dashboard"
                                className={({ isActive }) =>
                                    `${styles.dashboardLink} ${isActive ? styles.dashboardLinkActive : ''}`
                                }
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                key="Watchlist" 
                                to="/watchlist" 
                                aria-label="Watchlist"
                                className={({ isActive }) =>
                                    `${styles.dashboardLink} ${isActive ? styles.dashboardLinkActive : ''}`
                                }
                            >
                                Watchlist
                            </NavLink>
                        </li>
                    </ul>
                </div>
                
                <ul aria-label="User actions">
                    <li>
                        <NavLink
                            key="Search"
                            to="/search"
                            aria-label="Search"
                            className={({ isActive }) =>
                                    `${styles.searchLink} ${isActive ? styles.searchLinkActive : ''}`
                                }
                        >
                            <IoSearch />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            key="Profile"
                            to="/profile"
                            aria-label="Profile"
                            className={({ isActive }) =>
                                    `${styles.profileLink} ${isActive ? styles.profileLinkActive : ''}`
                                }
                        >
                            <img src="./src/assets/icons/default-user.jpg" alt="" />
                        </NavLink>
                    </li>
                    <li><div className={styles.userAvatar}></div></li>
                </ul>
            </div>

            {slot && (
                <div className={styles.additionalContent}>
                    {slot}
                </div>
            )}
            
        </nav>
    )

};
