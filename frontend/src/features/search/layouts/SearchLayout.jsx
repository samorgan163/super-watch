import TopNavbar from '../../../components/Nav/TopNavbar/TopNavbar';
import BottomNavbar from '../../../components/Nav/BottomNavbar/BottomNavbar';
import Navbar from '../../../components/Nav/Navbar/Navbar';

import styles from './SearchLayout.module.css';

import SearchNavbar from '../components/SearchNavbar/SearchNavbar';

export default function SearchLayout({ pageTitle, searchBar, children }) {

    // TODO: change this to detect where touch devices and decide nav bar from there
	const isMobileLayout = window.matchMedia('(max-width: 768px)').matches;

    return (
        <>
            {isMobileLayout 
                ? 
                <TopNavbar title={'Search'} >
                    {searchBar}
                </TopNavbar> 
                : 
                <Navbar />
            }

            <main 
				className={styles.main}
			>
				{children}
			</main>

			{isMobileLayout && <BottomNavbar />}
        </>
    );

}