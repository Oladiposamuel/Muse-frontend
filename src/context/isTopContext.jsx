import React, { createContext, useContext, useState, useEffect } from "react";

export const IsTopContext = createContext();

export const IsTopProvider = ({children}) => {
    const [isTop, setIsTop] = useState();

    const providerValue = {
        isTop,
        setIsTop,
    };

    return (
		<IsTopContext.Provider value={providerValue}>{children}</IsTopContext.Provider>
	);
}