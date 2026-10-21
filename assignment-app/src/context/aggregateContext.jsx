/* 
This context is used to track which cards on the search page have been selected by the user
to display the aggregate values for the metric of that card. This allows the user to make
decisions which will continue to apply when the user executes new searches, as well as when
the user navigates away from the search page and returns
*/

import React, {useContext, useState} from 'react';

const AggregateContext = React.createContext();

export function AggregateProvider({children}) {
    const [aggregates, setAggregates] = useState({});

    return (
        <AggregateContext.Provider value={[aggregates, setAggregates]}>
            {children}
        </AggregateContext.Provider>
    )
}

export function useAggregateContext() {
    const agg = useContext(AggregateContext);

    if(!agg ||Object.keys(agg)<1) throw new Error('useAggregateContext must be used in child component of AggregateProvidor')

    return agg;
}