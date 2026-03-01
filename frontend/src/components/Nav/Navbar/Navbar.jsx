import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from 'react';

export default function Navbar() {

    const [ hasUserScrolled, setHasUserScrolled ] = useState(false);

    useEffect(() => {
        
        const scrollHandler = () => {
            setHasUserScrolled(window.scrollY > 0);
        }

        window.addEventListener('scroll', scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);

    }, []);

    return (
        <nav className={`
            ${styles.navbar}
            ${
                hasUserScrolled 
                ?
                styles.navbarFullOpacity
                :
                styles.navbarFadedOpacity
            }
        `}>
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
        </nav>
    )

};