//Helper function returns, as float, a number with a desired number of decimal places, excluding trailing
//zeros; rounds up final decimal place

export default function noTrailingZeros(num, decimalPlaces) {
    //toFixed rounds, but not as expected in even typical cases
    //as noted in MDN article, (2.55).toFixed(1) returns the string 2.5
    //by multiplying, using plain toFixed, and then dividing, as below, this at least is
    //taken care of
    const temp = (num * (10 ** decimalPlaces)).toFixed()/(10**decimalPlaces);
    
    //to remove trailing zeros; Number(temp) would have worked, too
    return parseFloat(temp);
}