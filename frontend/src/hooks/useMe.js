import { useQuery } from '@tanstack/react-query';
import { checkAuth } from '../api/auth';

export function useMe() {
    return useQuery({
        queryKey: ['me'],
        queryFn: () => checkAuth(),
        retry: false, // retry on fails?
        staleTime: 1000 * 60 * 15, // the same as cookie expiry? gcTime too?
    });
}
