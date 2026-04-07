import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { checkAuth, login, logout } from './api';
import { useNavigate } from 'react-router-dom';

export function useMe() {
    return useQuery({
        queryKey: ['me'],
        queryFn: () => checkAuth(),
        retry: false, // retry on fails?
        staleTime: 1000 * 60 * 15, // the same as cookie expiry? gcTime too?
    });
}

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ username, password }) => login(username, password),
        onSuccess: (userData) => {
            queryClient.setQueryData(['me'], userData);
            navigate('/', { replace: true }); // redirect to dashboard
        }
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            queryClient.removeQueries(['me']);
            navigate('/login', { replace: true });
        }
    });
}
