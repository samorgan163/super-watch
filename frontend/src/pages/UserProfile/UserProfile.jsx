import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import styles from "./UserProfile.module.css";

import { getProfile } from "../../api/user";

export default function UserProfile() {

    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const getUser = async () => {
            try {
                const result = await getProfile();
                setUsername(result.username);
            }
            catch (error) {
                setError(error.message);
            }
        }
        getUser();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <div className={styles.profileWrapper}>
                <h1>Hello, {username}! Welcome to your profile.</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            
        </>
    )

}
