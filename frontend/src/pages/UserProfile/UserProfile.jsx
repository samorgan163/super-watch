import styles from "./UserProfile.module.css";
import PageLoading from '../../components/UI/PageLoading/PageLoading';
import PageRetry from '../../components/UI/PageRetry/PageRetry';

import { useLogout } from '../../features/auth/hooks';
import { useUserPage } from '../../features/user/hooks';

export default function UserProfile() {

    const logoutMutation = useLogout();

    // get user profile
    const { isLoading, isError, data, error, refetch } = useUserPage();

    const handleLogout = () => logoutMutation.mutate();

    if (isLoading) return <PageLoading />

    if (isError) return <PageRetry retryAction={refetch} />

    return (
        <div className={styles.profileWrapper}>
            <h2 className="font-regular text-color-primary text-l mb-16">
                Hello, {data.username}! Welcome to your profile.
            </h2>
            <button 
                onClick={handleLogout}
                className="button button-hover text-md"
                disabled={logoutMutation.isLoading}
            >
                Logout
            </button>
        </div>
    )

}
