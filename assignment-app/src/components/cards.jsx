/* 
This component displays six Card components for the purpose of presenting the user with aggregate information about
the data returned from the user's search.  The user clicks on the Card components that are for the particular information
the user wants.  If data is not loaded, the user does not have the option to save/unsave cards nor to click on the
card and view aggregate information.

The logic of this component is as follows:
State is created for filter/keyword -- changes to these is registered in the Card components
This state is updated whenever there is a change to the data; because useFetch sets data to null
whenever it receives data from the form, this ensures the filter/keyword state here will update
even if the results of a filter/keyword search are no different from the results from a search
of a different filter/keyword.

Via a custom hook, state is obtained to keep track of which filter/keyword aggregate information
is saved in sessionStorage, in order to have appropriate Cards start out with a check mark displaying
or not displaying.

Context is also loaded to keep track of which aggregate information the user wants displayed; this information is
per Card, not per filter/keyword, and a click-handling function is passed down to the individual Card components
in order to update this.

If data is loading or there is, in any case, no actual data that might be used to fill a table, Card components
are created to display a message saying no data loaded.
Otherwise, for each metric, aggregate values are calculated and sent to Card components in props. Numbers are formatted
so that there is a comma after any thousands, and the unit of measure is in singular/plural as appropriate.

The Cards component should fit on the page.



*/


import Card from "./card";
import calculateMetrics from "../helper/calculateMetrics";
import noTrailingZeros from "../helper/noTrailingZeros";
import { useAggregateContext } from "../context/aggregateContext";
import { numFormat, metricUnits, metricTitles } from "../helper/variousExportsAndSessionStorage";
import useDataContext from "../context/dataContext";


export default function Cards({ loading }) {

    const [data, _] = useDataContext();

    //derived state
    let filter;
    let keyword;
    if (!data?.filter || !data?.keyword) {
        filter = 'allData';
        keyword = '';
    } else if (data.json) {
        filter = data.filter;
        keyword = data.keyword;
    }

    const [aggregates, setAggregates] = useAggregateContext();

    function onClickHandler(e) {
        const aggregateName = e.currentTarget.getAttribute('name');
        setAggregates({ ...aggregates, [aggregateName]: !aggregates[aggregateName] })
    }

    //if no data was passed by props, return cards without calculating or displaying any metrics, and don't present the user checkboxes for saving
    if (loading || !data || !data.json || data.json.length < 1) {
        return (
            //I was unable to get cards to fill out available space without specifiying height
            <div className="row row-cols-2 g-3 mt-0 overflow-auto" style={{ height: '63.5vh' }}>
                {Object.entries(metricTitles).map(m => {
                    const metricCodeName = m[0];
                    const calculatedValuesForMetric = m[1];
                    return <Card name={metricCodeName} key={metricCodeName} title={calculatedValuesForMetric} displayAggregate={'trueSoText1WillDisplay'}
                        text1={'No data loaded from which to calculate metric'} saving={false} filter={filter} keyword={keyword} />
                })}
            </div>
        )
    }

    //returns array of objects, with same keys as metricTitles and property which is object full of calculationType/value
    //e.g. [{'usageTime': {average:..., median:..., min:..., max:...}, ...]
    const metrics = calculateMetrics(data);

    return (
        <div className="row row-cols-2 g-3 mt-0 overflow-auto" style={{ height: '63.5vh' }}>
            {Object.entries(metrics).map(m => {
                const metricCodeName = m[0];

                const calculatedValuesForMetric = m[1];
                const [average, median, min, max] = Object.entries(calculatedValuesForMetric).map(item => noTrailingZeros(item[1], 1))

                return <Card displayAggregate={aggregates[metricCodeName]} filter={filter} keyword={keyword} onClick={onClickHandler}
                    saving={true} name={metricCodeName} key={metricCodeName} title={metricTitles[metricCodeName]}
                    text1={`Average - ${numFormat.format(average)} ${(average === 1 && metricUnits[metricCodeName].singular) || metricUnits[metricCodeName].plural}`}
                    text2={`Median - ${numFormat.format(median)} ${(median === 1 && metricUnits[metricCodeName].singular) || metricUnits[metricCodeName].plural}`}
                    text3={`Min - ${numFormat.format(min)} ${(min === 1 && metricUnits[metricCodeName].singular) || metricUnits[metricCodeName].plural}`}
                    text4={`Max - ${numFormat.format(max)} ${(max === 1 && metricUnits[metricCodeName].singular) || metricUnits[metricCodeName].plural}`}
                />

            })}
        </div>

    )
}