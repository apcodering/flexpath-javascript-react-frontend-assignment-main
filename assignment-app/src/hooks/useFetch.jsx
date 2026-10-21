/* 
Receives FormData from form on search page
Provides state/context for loading status, error status, and data (plus filter and keyword)

If a fetch request is made while another is in process, the previous one is aborted and the error
associate with that is logged to the console but otherwise not registered in state as such or
displayed to the user.
*/

import { useState, useRef, useEffect } from "react";
import useDataContext from "../context/dataContext";
import { useOrderingContext } from "../context/orderingContext";

const url = '/api/data/search';


export default function useFetch(formData) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useDataContext();
    const [_, setColumnAndDirection] = useOrderingContext();


    //controller will allow us to abort fetch calls which are no longer needed to due a newer fetch call being made when
    //user submits new search before previous finishes; useRef allows us to hold on to the controller across renders
    const controller = useRef();

    useEffect(() => {
        async function fetcher() {
            try {
                if (!formData) {                            //this blocks fetch from being called just bc component is rendering 1st time
                    return;
                }
                setLoading(true);
                setData(null);

                //When there's a new data fetch, clear any sorting
                setColumnAndDirection({});

                //if there is an existing abort controller, trigger it; create a controller for fetch call below
                controller.current?.abort();
                controller.current = new AbortController();

                //probably don't need the '?' here
                const filter = formData?.get('filterType');
                const keyword = formData?.get('keyword');
                const response = await fetch(url + `?filterType=${filter}&keyword=${keyword}`, { signal: controller.current.signal });
                if (!response.ok) {
                    throw new Error('Response from server indicates error in retrieving data. Status: ' + response.status)
                }
                const json = await response.json();

                //abort and clear controller, just to be safe, now that we've finished everything needed after the fetch
                controller.current.abort();
                controller.current = null;

                setData({ json, filter, keyword });
                setError(null);
                setLoading(false);
            }

            catch (err) {
                if (err === "DOMException: The operation was aborted.") {   //If the error thrown is due to fetcher being called before the previous fetch finished, want
                    setError(null);                                         //to keep loading status as true (which will prevent an error from being displayed to user)
                    console.log(err)                                        //Will log error message, but the rest of the app should treat things as if there is no error
                    
                } else {
                    setLoading(false);
                    setError('Error: ' + err.message);
                }

            }
        }

        fetcher();

    }, [formData]);

    return [data, loading, error];  //if the user didn't use the form, data here will be whatever pre-existing data context there might be
}