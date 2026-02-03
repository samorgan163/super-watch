import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
 
function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        try {
            await login(username, password);
            navigate('/');
        }
        catch (error) {
            setError(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>

            {error && <p>{error}</p>}
        </form>
    );

}

export default Login;