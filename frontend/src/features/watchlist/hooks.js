import { checkWatchlist, removeFromWatchlist, addToWatchlist, getWatchlist } from './api';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMe } from '../auth/hooks';

import { watchlistKeys } from './queries';

export function useWatchlistPage() {

    const { data: user } = useMe();
    const userId = user?.user_id;

    const userWatchlistQueryKey = watchlistKeys.list(userId);

    return useQuery({
        queryKey: userWatchlistQueryKey,
        queryFn: () => getWatchlist(),
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled: !!userId,
    });
}

export function useWatchlist(tmdbId) {

    const { data: user } = useMe();
    const userId = user?.user_id;

    const queryClient = useQueryClient();

    const inWatchlistQueryKey = watchlistKeys.check(userId, tmdbId);

    // fetch initial watchlist state of film
    const { isLoading, isError, data } = useQuery({
        queryKey: inWatchlistQueryKey,
        queryFn: () => checkWatchlist(tmdbId),
        enabled: !!userId && !!tmdbId,
        staleTime: 1000 * 60 * 5,
    });

    const inWatchlist = data?.in_watchlist ?? false;

    const addMutation = useMutation({
        mutationFn: () => addToWatchlist(tmdbId),
        onMutate: async () => {
            // cancel outgoing, not to overwrite optimistic update
            await queryClient.cancelQueries({ queryKey: inWatchlistQueryKey });

            // get prev state from cache
            const prevState = queryClient.getQueryData(inWatchlistQueryKey);

            // optimistically update to new state,
            queryClient.setQueryData( inWatchlistQueryKey, { 
                in_watchlist: true
            });

            return { prevState };
        },
        onError: (err, variables, context) => {
            // rollback to prev state
            queryClient.setQueryData(inWatchlistQueryKey, context.prevState);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: inWatchlistQueryKey });
            queryClient.invalidateQueries({ queryKey: ['dashboard', user?.user_id] });
            queryClient.invalidateQueries({ queryKey: ['watchlist', user?.user_id] });
        }
    });

    const removeMutation = useMutation({
        mutationFn: () => removeFromWatchlist(tmdbId),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: inWatchlistQueryKey });

            const prevState = queryClient.getQueryData(inWatchlistQueryKey);

            queryClient.setQueryData( inWatchlistQueryKey, { 
                in_watchlist: false
             });

             return { prevState };
        },
        onError: (err, variables, context) => {
            queryClient.setQueryData(inWatchlistQueryKey, context.prevState);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: inWatchlistQueryKey });
            queryClient.invalidateQueries({ queryKey: ['dashboard', user?.user_id] });
            queryClient.invalidateQueries({ queryKey: ['watchlist', user?.user_id] });
        },
    });

    const toggleWatchlist = () => {
        inWatchlist ? removeMutation.mutate() : addMutation.mutate();
    };

    return { 
        inWatchlist, 
        isInitialLoading: isLoading, 
        isInitialError: isError,
        isMutationLoading: addMutation.isLoading || removeMutation.isLoading, 
        toggleWatchlist 
    };
}
