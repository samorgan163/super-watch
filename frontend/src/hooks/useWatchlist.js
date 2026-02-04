// hooks/useLike.js
import { useState, useEffect } from "react";

export function useWatchlist(tmdbId) {

    const [inWatchlist, setInWatchlist] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const checkWatchlist = async () => {
            setLoading(true);
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
            finally {
                setLoading(false);
            }
        }

        checkWatchlist();

    }, [tmdbId]);

    const toggleWatchlist = async () => {
        if (loading) return;
        setLoading(true);

        // if in watchlist, remove from watchlist
        if (inWatchlist) {
            setInWatchlist(false); // optimistic update UI
            try {
                const res = await fetch(`http://192.168.0.77:3000/watchlist/${encodeURIComponent(tmdbId)}`, {
                    method: "DELETE",
                    credentials: "include",
                });

                if (!res.ok) {
                    setInWatchlist(true); // revert UI change on failure
                }
            }
            catch {
                setInWatchlist(true); // revert UI change on failure
            }
            finally {
                setLoading(false);
            }
        }
        // if not in watchlist, add to watchlist
        else {
            setInWatchlist(true); // optimistic update UI
            try {
                const res = await fetch(`http://192.168.0.77:3000/watchlist/${encodeURIComponent(tmdbId)}`, {
                    method: "POST",
                    credentials: "include",
                });

                if (!res.ok) {
                    setInWatchlist(false); // revert UI change on failure
                }
            }
            catch (error) {
                setInWatchlist(false); // revert UI change on failure
            }
            finally {
                setLoading(false);
            }
        }
    };

    return { inWatchlist, loading, toggleWatchlist };
}
