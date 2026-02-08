import styles from "./Watchlist.module.css";
import FilmsGrid from "../../components/FilmsGrid/FilmsGrid";
import PageLoading from "../../components/PageLoading/PageLoading";

import { useState, useEffect } from "react";

function Watchlist() {

    const [loading, setLoading] = useState(true);
    
    const [watchlistStreaming, setWatchlistStreaming] = useState([]);
    const [watchlistUnavailable, setWatchlistUnavailable] = useState([]);

    useEffect(() => {
        const getWatchlist = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://192.168.0.77:3000/watchlist`, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const result = await response.json();
                    setWatchlistStreaming(result.streaming);
                    setWatchlistUnavailable(result.unavailable);
                }

            } catch (error) {
                console.log('Network Error:', error);
            }
            finally {
                setLoading(false);  
            }
        }

        getWatchlist();
    }, []);

    if (loading) return <PageLoading />;

    return (
        <div className="page-wrapper">
            <h1 style={{fontSize: "24px"}}>Currently Streaming</h1>
            <FilmsGrid films={watchlistStreaming || []}/>
            <h1 style={{fontSize: "24px"}}>Not Available</h1>
            <FilmsGrid films={watchlistUnavailable || []} fadeOpacity={true} />
        </div>
    );
}

export default Watchlist;
