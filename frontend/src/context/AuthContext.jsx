// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check auth on app load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('http://192.168.0.77:3000/auth/me', {
                    credentials: 'include',
                });

                if (!res.ok) {
                    setUser(null);
                }
                else {
                    const data = await res.json();
                    setUser({ id: data.user_id });
                }

            } catch (err) {
                console.error('Auth check failed', err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (username, password) => {
        const res = await fetch('http://192.168.0.77:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) throw new Error('Invalid credentials');

        const data = await res.json(); // optional: backend can return username
        setUser({ id: data.user_id });
    };

    const logout = async () => {
        await fetch('http://192.168.0.77:3000/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
