/* 
This context is used to store the JSX constituting the DataTable component. By storing
the JSX in context, there is no need to recalculate a table when displaying previous
results to a user returning to the search page
*/

import React, { useContext, useState } from "react";

const TableContext = new React.createContext();

export function TableProvider( {children}) {
    const [table, setTable] = useState(null);

    return (
        <TableContext.Provider value={[table, setTable]}>
            {children}
        </TableContext.Provider>
    )
}

export function useTableContext() {
    const context = useContext(TableContext);
    
    if (!context) {
        throw new Error('useTableContext must be used in child component of TableProvider')
    }

    return context;
}