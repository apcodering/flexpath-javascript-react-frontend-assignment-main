//This page displays the aggregate values for the metrics saved by the user, grouped according to filter/keyword
//and presented in the form of Cards
//The code functions in the following manner:
/*
First, the sessionStorage content is loaded into state; until this is achieved, there is state indicating that things
are loading, which prevents further activity other than the display of a message that no data is loaded

The data once loaded is in the form of an array of objects, with the objects having a property indicating
the filter, keyword, and metric corresponding to the data, which is a stringified array with the metric name followed by the aggregate values (average, etc.)

This data is then transformed into an array of [key, value] arrays, and via the map method, an array of objects is created, with each object
containing the filter, keyword, and and array of data (containing metric name and aggregate values).

Then, via forEach, each element of this array is iterated over and an object is populated such that
the aggregate values are grouped according to keyword, filter, and metric, allowing for subsequent creation of Cards

The Cards are created by iterating through this object; for each filter/keyword iteration, a header is printed indicating the filter/keyword,
and then all the metrics saved for that filter/keyword combination are sent as props to Cards

 */

import { storage } from "../../helper/variousExportsAndSessionStorage";
import { useEffect, useState } from "react";
import Card from "../card";
import { metricTitles } from "../../helper/variousExportsAndSessionStorage";

const filters = { "gender": 'Gender', "operatingSystem": 'Operating System', "model": 'Device Model', "behaviorclass": 'User Behavior Class' };

export default function SavedResults() {

    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState({});

    //This took care of page refreshes resulting in items being empty; presumably storage wasn't being loaded quickly enough
    useEffect(() => {
        setLoading(true);
        async function loader() {
            setItems({ ...storage });
            setLoading(false);
        }
        loader();
    }, [])

    const dataForCards = { "allData": {}, "gender": {}, "operatingSystem": {}, "model": {}, "behaviorclass": {} };


    //Group saved information by filter type and then keyword within filter type
    if (!loading) {
        Object.entries(items).map(keyValue => {                  //first, make an array of objects {filter, keyword, value}
            const value = JSON.parse(keyValue[1]);
            const [filter, keyword, _] = keyValue[0].split('.');
            return { filter, keyword, value };
        })
            .forEach(curr => {                                   //for each object add the value to the appropriate filter/keyword grouping (i.e. sort them)
                console.log('curr is', curr)
                const filterObjToAddTo = dataForCards[curr.filter];
                const keywordPropsMetricsValues = filterObjToAddTo[curr.keyword];

                if (!keywordPropsMetricsValues) {
                    filterObjToAddTo[curr.keyword] = [curr.value];
                    console.log('created array for keyword:', curr.keyword, 'which now is', [curr.value])
                } else {
                    keywordPropsMetricsValues.push(curr.value);
                    console.log('added data to existing keyword array, which is now:', keywordPropsMetricsValues)
                }

            })
    }

    return (
        <>
            {((!storage &&
                <div className="position-fixed top-50 start-50 translate-middle">
                    <p className="text-center">Your browser is currently not providing access to stored session data for this site,<br />
                        preventing the app from saving and displaying aggregate metric values from your search results on this page. </p>
                    <p className="text-center">You may still search the data and view aggregate values on the <a href='/search'>search page</a>.</p>
                </div>)
                || (Object.keys(items).length === 0 && <h4 className={'text-center'}>No saved metric data</h4>))   //If there are no saved items, indicate this
                ||
                (
                    Object.entries(dataForCards).map(filterPlus => {                            //for each filter
                        const filterVal = filterPlus[0];
                        const keywordPlusObjects = filterPlus[1];
                        if (keywordPlusObjects) {                                               //and for each search term
                            return Object.entries(keywordPlusObjects).map(keywordPlus => {
                                const keywordVal = keywordPlus[0];
                                const arrayOfMetrics = keywordPlus[1];

                                return (                                                        //print a header indicating these, followed by the cards
                                    <>
                                        <h2 className='text-center'>Saved aggregate information for {(filterVal === 'allData' && 'all data') || `filter ${filters[filterVal]} and search term ${keywordVal}`}</h2>
                                        <div className='container w-50 '>
                                            <div className="row row-cols-sm-2 justify-content-center">
                                                {arrayOfMetrics.map(value => {
                                                    return <><div className='col mb-3'>
                                                        <Card className="row row-cols-2 g-3 mt-0" displayAggregate={true} saving={true}
                                                            name={value[0]} key={filterVal + keywordVal + value[0]} filter={filterVal} keyword={keywordVal} title={metricTitles[value[0]]}
                                                            text1={value[1]}
                                                            text2={value[2]}
                                                            text3={value[3]}
                                                            text4={value[4]}
                                                        />
                                                    </div></>
                                                })}
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    })

                )
            }

        </>
    )
}