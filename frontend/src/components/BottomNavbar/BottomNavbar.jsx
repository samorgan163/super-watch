import styles from './BottomNavbar.module.css';
import { NavLink } from "react-router-dom";

import { IoHomeSharp } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";

import { IoSearchSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";

import { IoDocumentText } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";

import { IoPersonSharp } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

import watchlistIcon from '../../assets/icons/watchlist.png';

const navItems = [
	{ label: 'Dashboard', href: '/', iconSharp: <IoHomeSharp />, iconOutline: <IoHomeOutline /> },
	{ label: 'Add', href: '/search', iconSharp: <IoHomeSharp />, iconOutline: <IoHomeOutline /> },
	{ label: 'Watchlist', href: '/watchlist', iconSharp: <IoHomeSharp />, iconOutline: <IoHomeOutline /> },
	{ label: 'Profile', href: '/profile', iconSharp: <IoHomeSharp />, iconOutline: <IoHomeOutline /> },
];

function BottomNavbar() {
    return (
		<nav className={styles.navBottomWrapper}>
			<div className={styles.navBottom}>
				
					<NavLink 
						key='Dashboard' 
						to='/' end 
						aria-label='Dashboard'
						className={({ isActive }) => isActive ? styles.active : ''}
					>
						{({ isActive }) => (
							<>
								{isActive ? <IoHomeSharp /> : <IoHomeOutline />}
								<p>Dashboard</p>
							</>
						)}
					</NavLink>
					<NavLink 
						key='Search' 
						to='/search' 
						aria-label='Search'
						className={({ isActive }) => isActive ? styles.active : ''}
					>
						{({ isActive }) => (
							<>
								{isActive ? <IoSearchSharp /> : <IoSearchOutline />}
								<p>Search</p>
							</>
						)}
					</NavLink>
					<NavLink 
						key='Watchlist' 
						to='/watchlist' 
						aria-label='Watchlist'
						className={({ isActive }) => isActive ? styles.active : ''}
					>
						{({ isActive }) => (
							<>
								{isActive ? <IoDocumentText /> : <IoDocumentTextOutline />}
								<p>Watchlist</p>
							</>
						)}
					</NavLink>
					<NavLink 
						key='Profile' 
						to='/profile' 
						aria-label='Profile'
						className={({ isActive }) => isActive ? styles.active : ''}
					>
						{({ isActive }) => (
							<>
								{isActive ? <IoPersonSharp /> : <IoPersonOutline />}
								<p>Profile</p>
							</>
						)}
					</NavLink>
				
			</div>
		</nav>
    );
}

export default BottomNavbar;
