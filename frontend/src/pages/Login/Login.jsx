import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../../api/auth';
 
export default function Login() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginMutation = useMutation({
        mutationFn: ({ username, password }) => login(username, password),
        onSuccess: (userData) => {
            queryClient.setQueryData(['me'], userData);
            navigate('/'); // navigate to dashboard
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutateAsync({ username, password });
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

                    {loginMutation.isError && <p>Error loggin in</p>}
                </form>
            </div>
        </div>
    );

}
