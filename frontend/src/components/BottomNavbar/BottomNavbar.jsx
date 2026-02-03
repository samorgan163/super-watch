import styles from './BottomNavbar.module.css';
import { Link } from "react-router-dom";

import watchlistIcon from '../../assets/icons/watchlist.png';

const navItems = [
	{ label: 'Dashboard', href: '/', icon: watchlistIcon },
	{ label: 'Cinema', href: '/', icon: watchlistIcon },
	{ label: 'Add', href: '/', icon: watchlistIcon },
	{ label: 'Watchlist', href: '/', icon: watchlistIcon },
	{ label: 'Profile', href: '/profile', icon: watchlistIcon },
];

function BottomNavbar() {
    return (
		<nav className={styles.navBottomWrapper}>
			<div className={styles.navBottom}>
				{navItems.map((item) => (
					<Link key={item.label} to={item.href} aria-label={item.label}>
						<img src={item.icon} alt={`${item.label} icon`} />
						<p>{item.label}</p>
					</Link>
				))}
			</div>
		</nav>
    );
}

export default BottomNavbar;
