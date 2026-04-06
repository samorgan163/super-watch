import TopNavbar from '../../components/Nav/TopNavbar/TopNavbar';
import BottomNavbar from '../../components/Nav/BottomNavbar/BottomNavbar';
import Navbar from '../../components/Nav/Navbar/Navbar';

import styles from './AppLayout.module.css';
import { Outlet } from 'react-router-dom';

export default function AppLayout({ title, fullHeight = false }) {

	// TODO: change this to detect where touch devices and decide nav bar from there
	const isMobileLayout = window.matchMedia('(max-width: 768px)').matches;

    return (
		<>
			{isMobileLayout ? (
				<>
					{/*<TopNavbar />*/}
					<main className={`
						${fullHeight ? '' : styles.mobilePaddingTop} 
						${styles.mobilePaddingBottom}
					`}>
						<Outlet />
					</main>
					<BottomNavbar />
				</>
			) : (
				<>
					<Navbar />
					<main className={`
						${fullHeight ? '' : styles.desktopPaddingTop}
					`}>
						<Outlet />
					</main>
				</>
			)}
		</>
  	);
}
