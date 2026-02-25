import { useEffect } from "react";

const intersectThreshold = 0.5;

export function useInfiniteScroll(enabled, ref, callBack) {
    
    // Observe ref
    useEffect(() => {
        // stop if disabled
        if (!enabled) return;

        // stop if no ref
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            entries => {
                // trigger callback function on intersect
                if (entries[0].isIntersecting) {
                    console.log('intersecting');
                    callBack();
                }
            },
            { threshold: intersectThreshold }
        );

        console.log('observer created');

        observer.observe(element);
        
        return () => {
            observer.unobserve(element);
            observer.disconnect();
        };

    }, [enabled, ref, callBack]);

}
