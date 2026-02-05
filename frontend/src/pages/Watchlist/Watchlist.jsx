import styles from "./Watchlist.module.css";
import FilmsGrid from "../../components/FilmsGrid/FilmsGrid";
import PageLoading from "../../components/PageLoading/PageLoading";

import { useState, useEffect } from "react";

function Watchlist() {

    const [loading, setLoading] = useState(true);
    
    const [watchlist, setWatchlist] = useState([]);

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
                    setWatchlist(result.watchlist);
                    console.log(result.watchlist[0].film.title); // remove this later
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
            <h1>Watchlist</h1>
            <FilmsGrid films={watchlist || []}/>
        </div>
    );
}

export default Watchlist;
