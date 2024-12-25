import { createContext, useCallback, useContext, useState } from "react";

const CursorRefContext = createContext({
    boundsRefs: [],
    registerRef: () => {},
    unregisterRef: () => {}
});

export function CursorRefProvider({ children }) {
    const [ boundsRefs, setBoundsRefs ] = useState([]);

    const registerRef = useCallback((ref) => {
        setBoundsRefs((prevRefs) => {
            if(prevRefs.includes(ref)) {
                return prevRefs;
            }
            return [...prevRefs, ref];
        })
    }, []);

    const unregisterRef = useCallback((ref) => {
        setBoundsRefs((prevRefs) => prevRefs.filter((item) => item !== ref));
    }, []);

    return (
        <CursorRefContext.Provider 
            value={{
                boundsRefs,
                registerRef,
                unregisterRef
            }}
        >
            {children}
        </CursorRefContext.Provider>
    )
}

export const useCursorRef = () => {
    const context = useContext(CursorRefContext);
    if(context === undefined) {
        throw new Error('useCursorRef must be used within a CursorRefProvider');
    }
    const { boundsRefs, registerRef, unregisterRef } = context;
    return { boundsRefs, registerRef, unregisterRef };
}