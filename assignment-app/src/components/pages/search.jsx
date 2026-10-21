//This component displays the search form, the table results, and Cards displaying aggregate values for columns in the data
//This component is also responsible for fetching the data, using a custom hook

import { useState } from "react"
import Cards from "../cards";
import useFetch from "../../hooks/useFetch";
import FilterForm from "../filterForm";
import DataTable from "../dataTable";

//for converting filter values into the table headers/database keys
const filters = { "gender": 'Gender', "operatingSystem": 'Operating System', "model": 'Device Model', "behaviorclass": 'User Behavior Class' };


export default function Search() {
    //changes to formData, via form submission, will trigger re-render and useFetch will execute for new search parameters
    const [formData, setFormData] = useState(null);

    //data is just data context, but here it comes via useFetch; may not make a difference to receive it from useFetch (the only place data context is changed);
    //theoretically, if it were important to shield rest of app from non-final changes made to data context in useFetch,
    //such as setting data to null early on before fetch call, there would be a difference
    const [data, loading, error] = useFetch(formData);

    //control submission so that entire page does not refresh
    async function onSubmitHandler(e) {
        e.preventDefault();
        setFormData(new FormData(e.target));
    }

    return (
        <div className='row col m-2 mt-0 mb-0'>
            <div className="col-2 w-25 pb-2">
                <FilterForm handler={onSubmitHandler} />
                <h5 className='mb-2'>{(loading && 'Loading records...')
                    || (data && data.json && ((data.json.length > 0 && <>Displaying {data.json.length} results
                        {(!data.filter || !data.keyword || `, filtered by ${filters[data.filter]} = ${data.keyword}`)}</>)
                        || 'No records meeting your search criteria'))}</h5>
                <Cards loading={loading} />
            </div>

            <div className="col-2 w-75 ps-5">
                <div className='ml-4'>{loading || (error && <h3 className='text-danger text-center'>{error}</h3>) || <DataTable />}</div>
            </div>
        </div>
    )
}