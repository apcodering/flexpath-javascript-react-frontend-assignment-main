/* 
This component sets table state and returns a component.

The purpose, at least originally, of storing the table JSX in state or context was
so that it does not need to be recalculated for display when returning to the search page 
and the results of the last search need to be displayed. However, given that there is a 
component on the search page that displays the table,  I believe the table is indeed
recalculating when returning to the search page and the component is rendered

The table allows sorting, by column, in ascending and descending order
Numerical data is formatted so that there is a comma after any thousands

The table column headers stay at the top of the page; scrolling only moves
the data rows

The table is created by populating the table header with the key values of an arbitrary
object in the data (I used the very first object) and a button (i.e. an OrderClicker
component) to allow for sorting by the values in each column
Then, for the table body, the rows are populated by iterating over all the objects
in the sorted data and using the values for each property

If there is no data to create a table with, the table will just be <></>
*/


import useDataContext from "../context/dataContext";
import { useOrderingContext } from "../context/orderingContext";
import OrderClicker from "./orderClicker";
import { numFormat } from "../helper/variousExportsAndSessionStorage";
import sortDataForTable from "../helper/sortDataForTable";

export default function DataTable() {
    const [data, _1] = useDataContext();

    const [columnAndDirection, _2] = useOrderingContext();


    //No change to display if there is no data loaded
    if (!data || !data.json || data.json.length < 1) {
        return (<></>);
    } else {
        const dataForTable = sortDataForTable(data, columnAndDirection);
        return (
            <div className='overflow-auto' style={{ height: '88.1vh' }}>
                <table className='table table-striped table-hover' >
                    <thead>
                        <tr >{Object.entries(data.json[0]).map((entry) => {       //creating column headings from keys of very first data entry; any element would have worked just as well
                            const propertyNameAsColumnName = entry[0];
                            return (<th key={propertyNameAsColumnName} className='col sticky-top' >{propertyNameAsColumnName}
                                <OrderClicker column={propertyNameAsColumnName} />
                            </th>);
                        })
                        }</tr>
                    </thead>
                    <tbody>
                        {dataForTable.map(element => {         //going row by row
                            return (
                                <tr key={element['User ID']}>{Object.entries(element).map((entry) => {
                                    const propertyNameAsColumnName = entry[0];
                                    const propertyValueAsRowValue = entry[1];
                                    return <td key={`${element['User ID']}` + `${propertyNameAsColumnName}`}>
                                        {(!Number(propertyValueAsRowValue) && propertyValueAsRowValue) || numFormat.format(propertyValueAsRowValue)}
                                    </td>;
                                })}</tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

}