/* 
This helper function returns an array of sorted objects; the original data array
is not affected, which has the result that when columnAndDirection context changes,
the DataTable component is displays either the original unsorted data or a new
sorting based on the original unsorted data
 */

//data argument should be an array of JS objects, each of which corresponds to a row in the table w/column headings
//columnAndDirection argument should be an object with the property name corresponding to the column to sort and the property
//value the direction to sort that column (the value will be null if there is no sorting)
export default function sortDataForTable(data, columnAndDirection) {
    let dataForArray = data.json;

    const column = Object.keys(columnAndDirection)[0];
    const direction = Object.values(columnAndDirection)[0];

    if (direction && direction !== null) {
        //take care of columns with string data, which will be treated differently by toSorted                              
        if (['Device Model', 'Operating System', 'Gender'].includes(column)) {
            if (direction === 'ascending') {
                dataForArray = data.json.toSorted((a, b) => {
                    //Sort entire array of objects based on the object property corresponding to the column being sorted.
                    //Negative value indicates to toSorted that a comes before b; positive that b comes before a; 0/NaN that a and b are treated the same.
                    if (a[column].toLowerCase() < b[column].toLowerCase()) return -1;
                    if (a[column].toLowerCase() > b[column].toLowerCase()) return 1;
                    return 0;
                })
            }
            if (direction === 'descending') {
                dataForArray = data.json.toSorted((a, b) => {
                    if (b[column].toLowerCase() < a[column].toLowerCase()) return -1;
                    if (b[column].toLowerCase() > a[column].toLowerCase()) return 1;
                    return 0;
                })
            }
        }
        //take care of columns with numerical data
        else {
            if (direction === 'ascending') {
                dataForArray = data.json.toSorted((a, b) => {
                    //no need to use if statements, as subtraction will appropriately produce positive, negative, or 0
                    return a[column] - b[column];
                })
            }
            if (direction === 'descending') {
                dataForArray = data.json.toSorted((a, b) => {
                    return b[column] - a[column];
                })
            }
        }
    }

    return dataForArray;
}