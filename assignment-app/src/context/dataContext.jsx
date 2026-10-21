/* 
This context stores the data returned from the api converted from json to JS object, as well as
the filter/keyword sent to the server.
By saving data in context, it is not necessary to re-retrieve data in order to display the
most recent results when the user returns to the search page.
By saving the filter/keyword in context, Card components can display the appropriate saved/unsaved
status and clicking on them can result in the appropriate changes to storage in sessionStorage, as
Cards are linked to filter/keyword and are in saved/unsaved status depending on whether sessionsStorage
contains the filter/keyword for a given metric, while updates to sessionSotrage likewise
depend on Cards being linked to filter/keyword 

*/

import React, { useContext, useState } from "react";

const DataContext = React.createContext(null);

export function DataProvider({ children }) {
    const [data, setData] = useState(null);

    return (
        <DataContext.Provider value={[data, setData]}>
            {children}
        </DataContext.Provider>
    )
}

export default function useDataContext() {

    const data = useContext(DataContext);

    if (!data) {
        throw new Error('useDataContext must be used in a child component of DataProvider')
    }
    return data;

}