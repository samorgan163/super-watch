import { useQuery } from "@tanstack/react-query";
import { getFilm } from './api';

export function useFilmPage(tmdbId) {
    return useQuery({
        queryKey: ['film', tmdbId],
        queryFn: () => getFilm(tmdbId),
        retry: false,
        staleTime: 1000 * 60 * 60,
    });
}
