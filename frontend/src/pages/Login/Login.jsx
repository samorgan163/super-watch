import styles from './Login.module.css';

import { useState } from 'react';
import { useLogin } from '../../features/auth/hooks';
 
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loginMutation = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate({ username, password });
        setPassword('');
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginWrapper}>
                <h2>Login</h2>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <input
                        required
                        className='form-input-text'
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <input
                        required
                        className='form-input-text'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button 
                        type="submit"
                        className='button button-hover text-md text-color-primary'
                        disabled={loginMutation.isPending}
                    >
                        Login
                    </button>

                    {loginMutation.isError && <p>Error logging in</p>}
                </form>
            </div>
        </div>
    );

}
