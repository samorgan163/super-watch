import { useNavigate } from "react-router-dom";

import styles from "./UserProfile.module.css";
import PageLoading from '../../components/UI/PageLoading/PageLoading';
import PageRetry from '../../components/UI/PageRetry/PageRetry';

import { getProfile } from "../../api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../api/auth";
import { useMe } from "../../hooks/useMe";

export default function UserProfile() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: user } = useMe();
    const userId = user?.user_id;

    // get user profile
    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ['profile', userId],
        queryFn: () => getProfile(),
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled: !!userId,
    });

    // logout mutation
    const logoutMutation = useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            queryClient.removeQueries(['me']);
            navigate('/login');
        }
    });

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
            >
                Logout
            </button>
        </div>
    )

}
