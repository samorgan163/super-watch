import { BounceLoader } from "react-spinners";

import styles from "./PageLoading.module.css";

export default function PageLoading() {
    return (
        <div className={styles.pageLoadingWrapper}>
            <BounceLoader
                color={'#1657c7ff'}
                size={30}
                aria-label="Loading Spinner"
            />
        </div>
    );
}
