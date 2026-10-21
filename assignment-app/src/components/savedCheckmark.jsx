/* 
This component appears on Card components when the user may wish to save the aggregate
information for a particular metric to view later.

The component receives the saved status state, the setSaved function, and a function to update
sessionsStorage as props from its parent Card.

*/

import { useState } from "react";
import { storage } from "../helper/variousExportsAndSessionStorage";

export default function SavedCheckmark(props) {
    const key = props.filter + '.' + props.keyword + '.' + props.id;
    const [saved, setSaved] = useState(key in storage);

    //updateStorage is sent from the parent component as props, as there it has access
    //to variables which the parent Card needs but which the checkbox otherwise has no need for,
    //including aggregate values displayed in the Card
    function handleCheckBox(e) {
        e.stopPropagation();
        setSaved(!saved);
        props.updateStorage();
        //note, if storage were context instead of sessionStorage, it wouldn't be necessary to use any state for saved;
        //storage context could simply be updated and a derived state value for saved/unsaved would
        //be calculated on the re-render triggered by the context change
    }


    //form-switch makes it a toggle switch, which I think is more appropriate
    //Made this change after all coding; not going to rename variables etc referencing checkboxes
    return (
        <div className="form-check form-switch col ms-1" >
            <input className="form-check-input " type="checkbox" value='' id={props.id} checked={saved}
                onChange={(e) => handleCheckBox(e)} onClick={(e) => e.stopPropagation()} />
            <label className="form-check-label" htmlFor='save' >{(saved && 'Remove from saved') || 'Save'}</label>
        </div>
    )
}