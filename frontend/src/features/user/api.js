import { apiFetch } from "../../lib/api";

export const getProfile = () => {
    return apiFetch('/user/profile', {
        method: 'GET',
    });
};
