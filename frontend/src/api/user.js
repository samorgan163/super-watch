import { apiFetch } from "./client";

export const getDashboard = () => {
    return apiFetch('/user/dashboard', {
        method: 'GET',
    });
};

export const getProfile = () => {
    return apiFetch('/user/profile', {
        method: 'GET',
    });
};
