import React, { createContext, useState } from "react";

const AlignmentContext = createContext();

export const AlignmentProvider = ({ children }) => {
    const [alignments, setAlignments] = useState([]);

    const addAlignment = (newAlignment) => {
        setAlignments([...alignments, newAlignment]);
    };

    return (
        <AlignmentContext.Provider value={{ alignments, addAlignment }}>
            {children}
        </AlignmentContext.Provider>
    );
};
