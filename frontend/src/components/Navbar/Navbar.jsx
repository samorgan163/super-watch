import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";

export default function Navbar() {

    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <h1 className={styles.logo}>SuperWatch</h1>
                <ul className={styles.primary} aria-label="Main navigation">
                    <li>
                        <NavLink 
                            key="Dashboard" 
                            to="/" 
                            aria-label="Dashboard"
                            className={({ isActive }) => isActive ? styles.active : ''}
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            key="Watchlist" 
                            to="/watchlist" 
                            aria-label="Watchlist"
                            className={({ isActive }) => isActive ? styles.active : ''}
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
                        className={({ isActive }) => isActive ? styles.active : ''}
                    >
                        <IoSearch />
                    </NavLink>
                </li>
                <li><div className={styles.userAvatar}></div></li>
            </ul>
        </nav>
    )

};