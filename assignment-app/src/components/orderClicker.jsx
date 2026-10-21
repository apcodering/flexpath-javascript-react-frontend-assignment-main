/* 
An OrderClicker component is located beneath the column title of each column of the table displaying
data returned from the user's search.  These components set current column for sorting (only one
column is ever sorted at a time) as well as the direction of the sorting, either ascending or
descending.

The component itself is a button. When an OrderClicker component is clicked, its column is set as
the single column being sorted and it displays either an up or down arrow corresponding to the
direction of sorting; if the component is unsorted, it displays a down arrow and an up arrow side
by side.
*/


import { useOrderingContext } from "../context/orderingContext";

export default function OrderClicker(props) {

    const [columnAndDirection, setColumnAndDirection] = useOrderingContext();

    function nextOrder(currentOrder) {
        //console.log('should change order')
        switch (currentOrder) {
            case null: return 'ascending';
            case 'ascending': return 'descending';
            case 'descending': return null;
        }
    }

    function handleClick() {
        const direction = columnAndDirection[props.column]; //will be undefined if we've clicked a new column
        if (direction) {
            setColumnAndDirection({ [props.column]: nextOrder(direction) });
        } else {
            setColumnAndDirection({ [props.column]: 'ascending' })
        }
    }

    return <button className='btn btn-md btn-outline-secondary w-100 p-2' type='button' onClick={handleClick}>
        <div className='mx-auto' style={{ width: '1em' }}>{(columnAndDirection[props.column] === 'ascending' && `\u2191`)          //if we have the right column and the state says ascending
            || (columnAndDirection[props.column] === 'descending' && `\u2193`)   //if we have the right column and the state says descending
            || `\u21C5`}</div></button>                                                          //right column and state says null, or wrong column
}