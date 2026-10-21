/* 
Various non-function exports, as well as making sessionStorage available to other components
*/

//Takes care of commas showing up after thousands
export const numFormat = new Intl.NumberFormat('en-US');

//Allows correct display of plural/singular units of measure
export const metricUnits = {
    usageTime: { plural: 'minutes', singular: 'minute' },
    screenOnTime: { plural: 'hours', singular: 'hour' },
    numInstalledApps: { plural: 'apps', singular: 'app' },
    age: { plural: 'years old', singular: 'year old' },
    batteryDrain: { plural: 'mAh', singular: 'mAh' },
    dataUsage: { plural: 'MB', singular: 'MB' },
}

//Allows for display of nice text for metrics/column headers given "code name" of metric
export const metricTitles = {
    usageTime: 'App Usage Time (min/day)',
    screenOnTime: 'Screen On Time (hours/day)',
    numInstalledApps: 'Number of Apps Installed',
    age: 'Age',
    batteryDrain: 'Battery Drain (mAh/day)',
    dataUsage: 'Data Usage (MB/day)',
}

//Just the "code names" of the metrics
export const metricCodeNames = Object.keys(metricTitles);


//Makes window.sessionStorage available via single variable; not sure how necessary this is
export let storage;

//Given that this is sessionStorage, which is tab dependent, and not a large external resource,
//I don't know that it is necessary to wait for the "load" event
window.onload = function () {
    if (window.sessionStorage) {
        storage = window.sessionStorage;
    }
}