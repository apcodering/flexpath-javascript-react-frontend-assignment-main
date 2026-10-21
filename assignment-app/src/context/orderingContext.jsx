/* 
This context keeps track of the particular column which the user has selected to order
and which direction, if any, the column is to be sorted in.
*/

import React, { useState, useContext } from "react";

const OrderingContext = React.createContext(null);

export function OrderingProvider({ children }) {
    const [columnAndDirection, setColumnAndDirection] = useState({});

    return (
        <OrderingContext.Provider value={[columnAndDirection, setColumnAndDirection]}>
            {children}
        </OrderingContext.Provider>
    )
}

export function useOrderingContext() {
    const context = useContext(OrderingContext);

    if (!context) {
        throw new Error('useOrderingContext can only be used in child component of OrderingProvider');
    } else {
        return context;
    }
}