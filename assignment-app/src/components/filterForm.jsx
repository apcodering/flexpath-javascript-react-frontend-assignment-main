/* 
This component contains the filter dropdown with values expected by search api while displaying user-friendly text
and a button which the user clicks to submit the filter selected and keyword entered

The component receives a change handler as props, enabling change of state in the parent component

*/


const filterTypeOptions = ["gender", "operatingSystem", "model", "behaviorclass"];
const filters = { "gender": 'Gender', "operatingSystem": 'Operating System', "model": 'Device Model', "behaviorclass": 'User Behavior Class' };

export default function FilterForm({ handler }) {
    return (
        <form type="submit" onSubmit={handler}>
            <select className="form-select mb-4" name='filterType'>
                <option value="">Select filter option</option>
                {filterTypeOptions.map(e => {
                    return <option value={e} key={e}>{filters[e]}</option>
                })}
            </select>
            <input className="form-control w-100 mb-4" type='text' name='keyword' placeholder="Enter search term" />
            <button className="btn btn-outline-primary w-100 mb-4">Search</button>
        </form>
    )
}

