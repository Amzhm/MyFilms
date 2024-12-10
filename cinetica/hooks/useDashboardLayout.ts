// hooks/useDashboardLayout.ts
import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useLayoutContext } from '@/contexts/LayoutContext';
import { LayoutState } from '@/domain/layout/types';

export function useDashboardLayout() {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isClient, setIsClient] = useState<boolean>(false);
    const [showLogout, setShowLogout] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    const { authUseCase } = useAuthContext();
    const { layoutUseCase } = useLayoutContext();

    useEffect(() => {
        setIsClient(true);
        const mobile = layoutUseCase.isMobileView(window.innerWidth);
        setIsMobile(mobile);
        if (layoutUseCase.shouldCollapseOnMobile(mobile)) {
            setIsCollapsed(true);
        }
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const handleResize = () => {
            const mobile = layoutUseCase.isMobileView(window.innerWidth);
            setIsMobile(mobile);
            if (layoutUseCase.shouldCollapseOnMobile(mobile)) {
                setIsCollapsed(true);
            }
        };

        let resizeTimer: NodeJS.Timeout;
        const debouncedHandleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 100);
        };

        window.addEventListener('resize', debouncedHandleResize);
        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
            clearTimeout(resizeTimer);
        };
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
        try {
            await authUseCase.logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
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