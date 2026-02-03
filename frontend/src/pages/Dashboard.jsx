import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch('http://192.168.0.77:3000/dashboard',
                    {
                        method: 'GET',
                        credentials: 'include',
                    }
                );

                if (!res.ok) {
                    throw new Error('Failed to fetch user');
                }

                const result = await res.json();
                setUsername(result.username.username);
                console.log(result.username.username);
            }
            catch (error) {
                setError(error.message);
            }
        }
        getUser();
    }, []);

    return (
        <h1>Hello, {username}! Welcome to your dashboard.</h1>
    )

}

export default Dashboard;
