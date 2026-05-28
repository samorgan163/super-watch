import TopNavbar from '../../components/Nav/TopNavbar/TopNavbar';
import BottomNavbar from '../../components/Nav/BottomNavbar/BottomNavbar';
import Navbar from '../../components/Nav/Navbar/Navbar';

import styles from './AppLayout.module.css';
import { Outlet } from 'react-router-dom';

import { NavbarSlotProvider } from '../../components/Nav/NavbarSlotContext';

import { usePwa } from '../../context/PwaContext';

export default function AppLayout() {

	const isMobileLayout = usePwa();

	return (
		/* Provider to pass additional content to navbar */
		<NavbarSlotProvider>
			{isMobileLayout 
				? <TopNavbar title={'Home'} />
				: <Navbar />
			}
			<Outlet />
			{isMobileLayout && <BottomNavbar />}
		</NavbarSlotProvider>
	);
	
}
