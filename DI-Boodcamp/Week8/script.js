/* function calculateAverage(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}
 */

const calculateAverage = (arr) => arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
const calculateAverage = (arr) => arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / arr.length;