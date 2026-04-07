import { apiFetch } from '../../lib/api';

export const getDashboard = () => {
    return apiFetch('/user/dashboard', {
        method: 'GET',
    });
};
