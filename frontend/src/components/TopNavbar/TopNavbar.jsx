import styles from './TopNavbar.module.css';

function TopNavbar(props) {
    return (
		<nav class={styles.navTop}>
            <h1>{props.title}</h1>
        </nav>
    );
}

export default TopNavbar;
