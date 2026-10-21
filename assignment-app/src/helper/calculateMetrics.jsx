/* 
Helper functions for calculating the aggregate information to display on Card components
*/

import { metricTitles as columnsToCalculate } from "./variousExportsAndSessionStorage";

//Sum up the values in an array and then divide that sum by the number of values summed
function average(array, column) {
    return array.reduce((acc, curr) => acc + Number(curr[column]), 0) / array.length;
}

//median, min, and max all require sorting, so sort once in same function for all three
//Median is calculated by dividing array length less 1 by 2; if that is an integer, that means
//the array is odd numbered  (e.g. (length of 3 - 1)/2 = 1) and the element at that index of
//the sorted array is the middle value. If the result of that division is not an integer,
//then the array contains an even nmber of elements and there are two middle indeces, which
//are .5 above and below the non-integer; these are added and divided by 2
function medianMinMax(array, column) {                                                   
    const sorted = array.map(item => Number(item[column])).toSorted((a, b) => a - b);    //compare function is necessary for toSorted, otherwise sorts as if string e.g. 102 comes before 65
    const middleIndex = (sorted.length - 1) / 2;

    if (Number.isInteger(middleIndex)) {
        return { median: sorted[middleIndex], min: sorted[0], max: sorted[sorted.length - 1] };
    } else {
        return { median: (sorted[middleIndex - .5] + sorted[middleIndex + .5]) / 2, min: sorted[0], max: sorted[sorted.length - 1] };   //if middleIndex isn't an integer, it will be _.5
    }
}


//Create object with aggregate values from a block of data for each metric codename/title
export default function calculateMetrics(data) {

    if(!data.json) {
        throw new Error ('Attempted to calculate metrics without data to calculate from')
    }

    return Object.entries(columnsToCalculate).reduce((acc, curr) => {
        const metricCodeName = curr[0];
        const metricTitle = curr[1];
        return {
            ...acc,
            [metricCodeName]: {
                average: average(data.json, metricTitle),
                median: medianMinMax(data.json, metricTitle).median,
                min: medianMinMax(data.json, metricTitle).min,
                max: medianMinMax(data.json, metricTitle).max,
            }
        }
    }, {});

}

