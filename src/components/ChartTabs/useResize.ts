import { useCallback, useEffect, useState } from 'react';

// Debounce function to limit the rate of invocation
type DebounceFn = (...args: unknown[]) => void;

function debounce(fn: DebounceFn, ms = 300) {
    let timer: NodeJS.Timeout;
    return function (this: unknown, ...args: unknown[]) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, ms);
    };
}

// Custom hook to listen to resize events and return the width of an element
export function useResize({
    id,
    activeTab,
}: {
    id: string;
    activeTab: string;
}) {
    const [width, setWidth] = useState<number>(0);

    const handleResize = useCallback(() => {
        const element = document.getElementById(id);
        if (element) {
            setWidth(element.offsetWidth);
        }
    }, [id]);

    useEffect(() => {
        // Debounce resize events to prevent excessive DOM updates
        const debouncedHandleResize = debounce(handleResize);

        // Set initial width
        handleResize();

        // Add event listener to window resize
        window.addEventListener('resize', debouncedHandleResize);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    }, [handleResize]);

    useEffect(() => {
        // Update width when active tab changes
        // Do with a timeout to allow the tab to render first
        const timeout = setTimeout(() => {
            handleResize();
        });
        return () => clearTimeout(timeout);
    }, [activeTab, handleResize]);

    return width;
}
