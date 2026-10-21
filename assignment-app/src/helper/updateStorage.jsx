/* 
This helper function receives props ultimately from a Card; if sessionStorage
contains an element with relevant key (filter.keyword.metric name), that element is removed;
if it doesn't contain such an element, then an element with that key and the value
a stringified array of the metric and the corresponding aggregate values
*/

import { storage } from "./variousExportsAndSessionStorage";

export default function updateStorage(props) {
    
    let key = `${props.filter}.${props.keyword}.${props.name}`;

    if (storage && storage.getItem(key)) {
        storage.removeItem(key);
    } else if (storage) {
        storage.setItem(key, JSON.stringify([props.name, props.text1, props.text2, props.text3, props.text4]));
    }
}