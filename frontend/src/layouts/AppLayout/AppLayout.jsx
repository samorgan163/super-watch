import TopNavbar from '../../components/Nav/TopNavbar/TopNavbar';
import BottomNavbar from '../../components/Nav/BottomNavbar/BottomNavbar';
import Navbar from '../../components/Nav/Navbar/Navbar';

import styles from './AppLayout.module.css';

function AppLayout({ title, children, fullHeight = false }) {

	// TODO: change this to detect where touch devices and decide nav bar from there
	const isMobileLayout = window.matchMedia('(max-width: 768px)').matches;
	console.log(isMobileLayout);

    return (
		<>
			{isMobileLayout ? (
				<>
					{/*<TopNavbar />*/}
					<main className={`
						${fullHeight ? '' : styles.mobilePaddingTop} 
						${styles.mobilePaddingBottom}
					`}>
						{children}
					</main>
					<BottomNavbar />
				</>
			) : (
				<>
					<Navbar />
					<main className={`
						${fullHeight ? '' : styles.desktopPaddingTop}
					`}>
						{children}
					</main>
				</>
			)}
		</>
  	);
}

export default AppLayout;
