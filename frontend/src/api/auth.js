import { apiFetch } from "./client";

export const checkAuth = () => {
    return apiFetch('/auth/me', {
        method: 'GET',
    });
};

export const login = (username, password) => {
    return apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });
};

export const logout = () => {
    return apiFetch('/auth/logout', {
        method: 'POST',
    });
};
