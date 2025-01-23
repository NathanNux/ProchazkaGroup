import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const PerformanceContext = createContext();

export function PerformanceProvider({ children }) {
    const [isSlowNetwork, setIsSlowNetwork] = useState(false);
    const [isLowPerformance, setIsLowPerformance] = useState(false);
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const [hasTouchScreen, setHasTouchScreen] = useState(false);

    useEffect(() => {
        // Check network
        const connection = navigator?.connection;
        if (connection) {
            const checkConnection = () => {
                setIsSlowNetwork(connection.downlink < 5 || connection.rtt > 650);
            };
            checkConnection();
            connection.addEventListener('change', checkConnection);
            return () => connection.removeEventListener('change', checkConnection);
        }

        // Check device performance
        const checkPerformance = () => {
            const cores = navigator.hardwareConcurrency || 4;
            const memory = navigator?.deviceMemory || 4;
            setIsLowPerformance(cores < 4 || memory < 4);
        };
        checkPerformance();

        // Check mobile/touch
        const checkDevice = () => {
            setIsMobileDevice(window.innerWidth <= 768);
            setHasTouchScreen(
                ('ontouchstart' in window) || 
                (navigator.maxTouchPoints > 0)
            );
        };
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    const value = useMemo(() => ({
        isSlowNetwork,
        isLowPerformance,
        isMobileDevice,
        hasTouchScreen,
        // Computed helper
        shouldReduceAnimations: isSlowNetwork || isLowPerformance || isMobileDevice
    }), [isSlowNetwork, isLowPerformance, isMobileDevice, hasTouchScreen]);

    return (
        <PerformanceContext.Provider value={value}>
            {children}
        </PerformanceContext.Provider>
    );
}

export function usePerformance() {
    const context = useContext(PerformanceContext);
    if (!context) {
        throw new Error('usePerformance must be used within PerformanceProvider');
    }
    return context;
}