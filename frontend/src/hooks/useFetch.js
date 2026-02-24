import { useState, useEffect } from "react";

// TODO: handle race conditions
export function useFetch(fetchFunction, dependencies = []) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
        
    const [data, setData] = useState({});
    
    const getData = async () => {
        try {
            setError(false);
            setLoading(true);
            const result = await fetchFunction();
            setData(result);
        } catch {
            setError(true);
        }
        finally {
            setLoading(false);  
        }
    };
    
    useEffect(() => {
        getData();
    }, dependencies);

    return { loading, error, data, retry: getData };

}
