import { checkWatchlist, removeFromWatchlist, addToWatchlist } from "../api/watchlist";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMe } from "./useMe";

export function useWatchlist(tmdbId) {

    const { data: user } = useMe();
    const userId = user?.user_id;

    const queryClient = useQueryClient();

    const inWatchlistQueryKey = ['watchlist-check', userId, tmdbId];

    const { isPending: isInitialLoading, 
        isError: isInitialError,
        data, 
        error, 
        refetch, 
    } = useQuery({
        queryKey: inWatchlistQueryKey,
        queryFn: () => checkWatchlist(tmdbId),
        enabled: !!userId && !!tmdbId,
        staleTime: 1000 * 60 * 5,
    });

    const inWatchlist = data?.in_watchlist || false;

    const { 
        mutate: toggleWatchlist, 
        isPending: isMutationLoading 
    } = useMutation({
        mutationFn: () => {
            return inWatchlist
                ? removeFromWatchlist(tmdbId)
                : addToWatchlist(tmdbId);
        },
        onMutate: async () => {
            // cancel outgoing, not to overwrite optimistic update
            await queryClient.cancelQueries({ queryKey: inWatchlistQueryKey });

            // copy prev state
            const prevState = queryClient.getQueryData(inWatchlistQueryKey);
            const newState = !prevState?.in_watchlist;

            // optimistically update to new state,
            queryClient.setQueryData( inWatchlistQueryKey, { 
                in_watchlist: newState 
            });

            return { prevState };
        },
        onError: (err, variables, context) => {
            // rollback to prev state
            if (context?.prevState) {
                queryClient.setQueryData(inWatchlistQueryKey, context.prevState);
            }
        },
        onSettled: () => {
            // refetch cache for pages effected by watchlist updates
            queryClient.invalidateQueries({ queryKey: inWatchlistQueryKey });
            queryClient.invalidateQueries({ queryKey: ['dashboard', user?.user_id] });
            queryClient.invalidateQueries({ queryKey: ['watchlist', user?.user_id] });
        }
    });

    return { 
        inWatchlist, 
        isInitialLoading, 
        isInitialError,
        isMutationLoading, 
        toggleWatchlist 
    };
}
