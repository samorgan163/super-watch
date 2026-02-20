import styles from './BottomNavbar.module.css';
import { Link } from "react-router-dom";

import { IoHomeSharp } from "react-icons/io5";

import watchlistIcon from '../../assets/icons/watchlist.png';

const navItems = [
	{ label: 'Dashboard', href: '/', icon: <IoHomeSharp /> },
	{ label: 'Add', href: '/search', icon: <IoHomeSharp /> },
	{ label: 'Watchlist', href: '/watchlist', icon: <IoHomeSharp /> },
	{ label: 'Profile', href: '/profile', icon: <IoHomeSharp /> },
];

function BottomNavbar() {
    return (
		<nav className={styles.navBottomWrapper}>
			<div className={styles.navBottom}>
				{navItems.map((item) => (
					<Link key={item.label} to={item.href} aria-label={item.label}>
						
							{item.icon}
						
						<p>{item.label}</p>
					</Link>
				))}
			</div>
		</nav>
    );
}

export default BottomNavbar;
