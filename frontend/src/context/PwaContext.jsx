/* 
    TODO: 
    currently only detect if app is in standalone mode,
    this mean if installed on desktop is will be detected,
    not ideal as the main reason for this is to display mobile ui
*/

import {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';

const PwaContext = createContext(null);

export function usePwa() {
    return useContext(PwaContext);
}

export function PwaProvider({ children }) {
    const [isPwa, setIsPwa] = useState(false);

    useEffect(() => {
        const checkPwa = () => {
            const isStandalone =
                window.matchMedia('(display-mode: standalone)').matches ||
                window.navigator.standalone === true;
            setIsPwa(isStandalone);
        };
        checkPwa();
    }, []);

    return (
        <PwaContext.Provider value={isPwa}>
            {children}
        </PwaContext.Provider>
    );
}
