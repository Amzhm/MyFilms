import { useState, useEffect, useRef } from 'react';
import { signOut } from 'next-auth/react';

interface DashboardLayoutHooks {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
    isMobile: boolean;
    isClient: boolean;
    toggleSidebar: () => void;
    showLogout: boolean;
    setShowLogout: (value: boolean) => void;
    handleLogout: () => Promise<void>;
    popupRef: React.RefObject<HTMLDivElement>;
}

export function useDashboardLayout(): DashboardLayoutHooks {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isClient, setIsClient] = useState<boolean>(false);
    const [showLogout, setShowLogout] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowLogout(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/login' });
    };

    return {
        isCollapsed,
        setIsCollapsed,
        isMobile,
        isClient,
        toggleSidebar,
        showLogout,
        setShowLogout,
        handleLogout,
        popupRef
    };
}