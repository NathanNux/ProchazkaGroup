// LoadProvider.jsx
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

const LoadContext = createContext();

export function LoadProvider({ children }) {
    const [firstLoad, setFirstLoad] = useState(true);
    const minRunTime = 4;
    const maxRunTime = 4;

    // Calculate runTime once and memoize it
    const runTime = useMemo(() => {
        const generatedTime = Math.random() * (maxRunTime - minRunTime) + minRunTime;
        return Math.max(generatedTime, 0.1);
    }, [])



    useEffect(() => {
        const timer = setTimeout(() => {
            setFirstLoad(false);
            document.body.style.overflow = '';
        }, runTime * 1000);

        document.body.style.overflow = 'hidden';
        return () => clearTimeout(timer);
    }, [firstLoad]);

    // Memoize context value to prevent unnecessary re-renders
    // change this when the preloader will be ready to run normally
    const value = useMemo(() => ({ firstLoad, setFirstLoad, runTime }), [firstLoad, runTime]);

    return (
        <LoadContext.Provider value={value}>
            {children}
        </LoadContext.Provider>
    );
}

export function useGlobalContext() {
    const context = useContext(LoadContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a LoadProvider');
    }
    const { firstLoad, setFirstLoad, runTime } = context;
    return { firstLoad, setFirstLoad, runTime };
}