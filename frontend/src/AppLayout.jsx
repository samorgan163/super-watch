import TopNavbar from './components/TopNavbar/TopNavbar';
import BottomNavbar from './components/BottomNavbar/BottomNavbar';

function AppLayout({ title, children }) {
    return (
      	<>
			<TopNavbar title={title}/>
			<main>{children}</main>
			<BottomNavbar />
      	</>
    );
}

export default AppLayout;
