import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import styles from "./UserProfile.module.css";
import PageLoading from "../../components/PageLoading/PageLoading";
import PageRetry from "../../components/PageRetry/PageRetry";

import { getProfile } from "../../api/user";
import { useFetch } from "../../hooks/useFetch";

export default function UserProfile() {

    const navigate = useNavigate();
    const { handleLogout } = useAuth();

    const logout = async () => {
        await handleLogout();
        navigate('/login');
    }

    const { loading, error, data, retry } = useFetch(
        () => getProfile(), []
    );

    if (loading) return <PageLoading />

    if (error) return <PageRetry retryAction={retry} />

    return (
        <>
            <div className={styles.profileWrapper}>
                <h2 className="font-regular text-color-primary text-l mb-16">
                    Hello, {data.username}! Welcome to your profile.
                </h2>
                <button 
                    onClick={logout}
                    className="button button-hover text-md"
                >
                    Logout
                </button>
            </div>
        </>
    )

}
