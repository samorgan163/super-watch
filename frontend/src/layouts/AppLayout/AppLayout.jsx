import TopNavbar from '../../components/Nav/TopNavbar/TopNavbar';
import BottomNavbar from '../../components/Nav/BottomNavbar/BottomNavbar';
import Navbar from '../../components/Nav/Navbar/Navbar';

import styles from './AppLayout.module.css';
import { Outlet } from 'react-router-dom';

export default function AppLayout({ title, fullHeight = false, fullWidth = false }) {

	// TODO: change this to detect where touch devices and decide nav bar from there
	const isMobileLayout = window.matchMedia('(max-width: 768px)').matches;

	return (
		<>
			{isMobileLayout ? null : <Navbar />}

			<main 
				className={isMobileLayout ? styles.mobile : styles.desktop}
				data-full-height={fullHeight}
				data-full-width={fullWidth}
			>
				<Outlet />
			</main>

			{isMobileLayout && <BottomNavbar />}

		</>
	);
	
}
