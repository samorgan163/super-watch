import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import styles from './Login.module.css';
 
function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        try {
            await handleLogin(username, password);
            navigate('/');
        }
        catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginWrapper}>
                <h2>Login</h2>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <input
                        className='form-input-text'
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <input
                        className='form-input-text'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button 
                        type="submit"
                        className='button button-hover text-md text-color-primary'
                    >
                        Login
                    </button>

                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );

}

export default Login;