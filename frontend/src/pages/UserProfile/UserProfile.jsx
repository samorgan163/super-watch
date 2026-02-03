import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserProfile() {

    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch('http://192.168.0.77:3000/user/profile',
                    {
                        method: 'GET',
                        credentials: 'include',
                    }
                );

                if (!res.ok) {
                    throw new Error('Failed to fetch user');
                }

                const result = await res.json();
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
            <h1>Hello, {username}! Welcome to your profile.</h1>
            <button onClick={handleLogout}>Logout</button>
        </>
        
    )

}
