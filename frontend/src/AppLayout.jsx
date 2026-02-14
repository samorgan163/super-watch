import TopNavbar from './components/TopNavbar/TopNavbar';
import BottomNavbar from './components/BottomNavbar/BottomNavbar';
import Navbar from './components/Navbar/Navbar';

function AppLayout({ title, children }) {

	// TODO: change this to detect where touch devices and decide nav bar from there
	const isMobileLayout = window.matchMedia('(max-width: 768px)').matches;
	console.log(isMobileLayout);

    return (
		<>
			{isMobileLayout ? (
				<>
					<TopNavbar />
					<main>{children}</main>
					<BottomNavbar />
				</>
			) : (
				<>
					<Navbar />
					<main>{children}</main>
				</>
			)}
		</>
  	);
}

export default AppLayout;
