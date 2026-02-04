// hooks/useLike.js
import { useState, useEffect } from "react";

export function useWatchlist(tmdbId) {

    const [inWatchlist, setInWatchlist] = useState(false);

    useEffect(() => {

        const checkWatchlist = async () => {
            try {
                const response = await fetch(`http://192.168.0.77:3000/watchlist/check/${encodeURIComponent(tmdbId)}`, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const result = await response.json();
                    setInWatchlist(result.in_watchlist);
                }

            } catch {
                console.log('Network Error');
            }
        }

        checkWatchlist();

    }, [tmdbId]);

    return { inWatchlist };
}
