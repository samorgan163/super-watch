import styles from "./Dashboard.module.css";
import HorizontalScrollFilmGrid from '../../components/HorizontalScrollFilmGrid/HorizontalScrollFilmGrid';
import { useEffect, useState } from "react";
import PageLoading from "../../components/PageLoading/PageLoading";

export default function Dashboard() {

    const [loading, setLoading] = useState(true);
    
    const [watchlistStreaming, setWatchlistStreaming] = useState([]);

    useEffect(() => {
        const getDashboardData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://192.168.0.77:3000/dashboard`, {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const result = await response.json();
                    setWatchlistStreaming(result.streaming_watchlist);
                }

            } catch {
                console.log('Network Error');
            }
            finally {
                setLoading(false);  
            }
        }

        getDashboardData();
    }, []);

    if (loading) return <PageLoading />;

    return (
        <div className='page-wrapper'> 
            <HorizontalScrollFilmGrid films={watchlistStreaming} />
        </div>
    );
}
