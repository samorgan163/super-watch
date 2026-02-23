// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";

import { checkAuth, login, logout } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check auth on app load
    useEffect(() => {
        const authenticate = async () => {
            try {
                const result = await checkAuth();
                setUser({ id: result.user_id });
            } catch (err) {
                console.error('Auth check failed', err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        authenticate();
    }, []);

    const handleLogin = async (username, password) => {
        try {
            const result = await login(username, password);
            setUser({ id: result.user_id });
        }
        catch (err) {
            console.error('sign in failed', err);
        }
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
