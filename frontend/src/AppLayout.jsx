import TopNavbar from './components/TopNavbar/TopNavbar';
import BottomNavbar from './components/BottomNavbar/BottomNavbar';
import Navbar from './components/NavBar/Navbav';

function AppLayout({ title, children }) {
    return (
      	<>
			<Navbar />
			<main>{children}</main>
			
      	</>
    );
}

export default AppLayout;
