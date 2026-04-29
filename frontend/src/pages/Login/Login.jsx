import styles from './Login.module.css';

import { useState } from 'react';
import { useLogin } from '../../features/auth/hooks';

import Input from '../../components/UI/Input/Input';
import Button from '@/components/UI/Button/Button';
import AuthNav from '../../features/auth/components/AuthNav/AuthNav';
 
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
        <div className={styles.pageWrapper}>
            <AuthNav />
            <div className={styles.loginWrapper}>
                <h1 className={styles.title}>Enter your info to sign in</h1>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <Input
                        required
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <Input 
                        required
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <Button
                        type='submit'
                        disabled={loginMutation.isPending}
                        variant='secondary'
                    >
                        Continue
                    </Button>

                    {loginMutation.isError && <p>Error logging in</p>}
                </form>
                <p>Try the demo version</p>
            </div>
            
        </div>
    );

}
