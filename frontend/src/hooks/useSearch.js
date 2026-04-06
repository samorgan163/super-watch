import { searchFilms } from "../api/film";
import { useInfiniteScroll } from "./useInfiniteScroll";
import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useRef } from "react";

export function useSearch(query) {

    const loaderRef = useRef(null);

    const {
        data,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['search', query],
        staleTime: 1000 * 60 * 5,
        queryFn: ({ pageParam = 1 }) => searchFilms(query, pageParam),
        enabled: !!query,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
        }
    });

    const handleFetchNextPage = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    // observer to load new results when user scrolls to bottom
    useInfiniteScroll(
        hasNextPage,
        loaderRef,
        handleFetchNextPage
    );

    return {
        data,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        loaderRef,
    }

}
