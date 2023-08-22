import React, { createContext, useState } from "react";

export const AlignmentsContext = createContext();

export const AlignmentProvider = ({ children }) => {
    const [alignments, setAlignments] = useState([]);

    const addAlignment = (newAlignment) => {
        setAlignments([...alignments, newAlignment]);
    };

    return (
        <AlignmentsContext.Provider value={{ alignments, addAlignment }}>
            {children}
        </AlignmentsContext.Provider>
    );
};
