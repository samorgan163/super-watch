// hooks/useLike.js
import { useState, useEffect } from "react";

import { checkWatchlist, removeFromWatchlist, addToWatchlist } from "../api/watchlist";

export function useWatchlist(tmdbId) {

    const [inWatchlist, setInWatchlist] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkIfInWatchlist = async () => {
            setLoading(true);
            try {
                const result = await checkWatchlist(tmdbId);
                setInWatchlist(result.in_watchlist);
            } catch {
                console.log('Network Error');
            }
            finally {
                setLoading(false);
            }
        }
        checkIfInWatchlist();
    }, [tmdbId]);

    const toggleWatchlist = async () => {
        if (loading) return;
        
        // if in watchlist, remove from watchlist
        if (inWatchlist) {
            setLoading(true);
            setInWatchlist(false); // optimistic update UI
            try {
                await removeFromWatchlist(tmdbId);
            }
            catch {
                setInWatchlist(true); // revert UI change on failure
                // TODO: display error to user?
            }
            finally {
                setLoading(false);
            }
        }
        // if not in watchlist, add to watchlist
        else {
            setLoading(true);
            setInWatchlist(true); // optimistic update UI
            try {
                await addToWatchlist(tmdbId);
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
