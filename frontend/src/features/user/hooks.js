import { useQuery } from "@tanstack/react-query";
import { getProfile } from './api';
import { useMe } from '../auth/hooks';

export function useUserPage() {
    const { data: user } = useMe();
    const userId = user?.user_id;

    return useQuery({
        queryKey: ['profile', userId],
        queryFn: () => getProfile(),
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled: !!userId,
    });
}
