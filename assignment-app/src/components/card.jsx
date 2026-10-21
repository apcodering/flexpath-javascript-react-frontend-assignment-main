//This component displays text passed via props; it is used on the search page as well as the saved results page,
//and since these two pages require the cards to behave somewhat differently, props are used to allow for variation depending on circumstances.
//
//If sessionStorage has loaded correctly, this component also allows the user to click a checkbox indicating if they want the aggregate metric information to be available
//to them after they refilter the data or navigate away from the data results. A Card keeps track of whether it is saved or not,
//and it passes a function for updating this state down to the checkbox

//A Card can also display a message indicating that the user needs to click the card in order to display aggregate metric information.

import { storage } from "../helper/variousExportsAndSessionStorage";
import SavedCheckmark from "./savedCheckmark";
import updateStorage from "../helper/updateStorage";

export default function Card(props) {

    return (
        <div className="col">
            <div className="card p-0 w-100 h-100 m-0">
                <div className='col row-cols-1 p-1'>
                    <div className='row row-cols-1 h-25 p-0 m-0'>{props.saving &&
                        (!storage ||
                            <SavedCheckmark id={props.name} filter={props.filter} keyword={props.keyword} updateStorage={() => updateStorage(props)} />)}

                    </div>
                    <h5 className="card-title text-center p-1 fs-6 fw-semibold">{props.title}</h5>
                </div>
                <div onClick={props.onClick} name={props.name} className='col row-cols-1 pb-1 pt-0'>
                    {((props.displayAggregate) &&
                        <div className='p-0'>
                            <p className="card-text text-center m-0">{props.text1}</p>
                            <p className="card-text text-center m-0">{props.text2}</p>
                            <p className="card-text text-center m-0">{props.text3}</p>
                            <p className="card-text text-center m-0">{props.text4}</p>
                        </div>
                    ) ||
                        <div  className='text-center'>Click to display aggregate values for this metric</div>
                    }
                </div>
            </div>
        </div>
    )
}