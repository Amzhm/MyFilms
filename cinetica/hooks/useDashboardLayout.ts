// hooks/useDashboardLayout.ts
import { useState, useEffect } from 'react';

export function useDashboardLayout() {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (mobile) {
                setIsCollapsed(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isClient]);

    const toggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    return {
        isCollapsed,
        setIsCollapsed,
        isMobile,
        isClient,
        toggleSidebar
    };
}