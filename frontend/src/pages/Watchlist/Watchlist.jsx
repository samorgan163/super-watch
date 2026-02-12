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
        <>
            <section className="section-with-padding">
                <FilmsGrid films={watchlistStreaming || []} title="Currently Streaming"/>
            </section>
            <section className="section-with-padding">
                <FilmsGrid films={watchlistUnavailable || []} fadeOpacity={true} title="Not Available" />
            </section>
        </>
    );
}

export default Watchlist;
