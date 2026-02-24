import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import styles from "./UserProfile.module.css";
import PageLoading from "../../components/PageLoading/PageLoading";
import PageRetry from "../../components/PageRetry/PageRetry";

import { getProfile } from "../../api/user";

export default function UserProfile() {

    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { handleLogout } = useAuth();

    const logout = async () => {
        await handleLogout();
        navigate('/login');
    }

    const getUserData = async () => {
        try {
            setError(false);
            setLoading(true);
            const result = await getProfile();
            setUsername(result.username);
        }
        catch (err) {
            setError(true);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    if (loading) return <PageLoading />

    if (error) return <PageRetry retryAction={getUserData} />

    return (
        <>
            <div className={styles.profileWrapper}>
                <h2 className="font-regular text-color-primary text-l mb-16">
                    Hello, {username}! Welcome to your profile.
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
