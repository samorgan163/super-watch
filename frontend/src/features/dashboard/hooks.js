import { useQuery } from "@tanstack/react-query";
import { getDashboard } from './api';
import { useMe } from '../auth/hooks';

export function useDashboardPage() {
    const { data: user } = useMe();
    const userId = user?.user_id;

    return useQuery({
        queryKey: ['dashboard', userId],
        queryFn: () => getDashboard(),
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled: !!userId,
    });
}
