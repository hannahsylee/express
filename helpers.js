/**
 * The "mean" is the "average" you're used to, where you add up all the numbers
 * and then divide by the number of numbers.
 *
 * For example, the "mean" of [3, 5, 4, 4, 1, 1, 2, 3] is 2.875.
 *
 * @param {Array} numbers An array of numbers.
 * @return {Number} The calculated average (or mean) value from the specified
 *     numbers.
 */

function mean(numbers) {
    let total = 0, i;
    if (numbers.length === 0) return 0;

    for (i = 0; i < numbers.length; i += 1) {
        total += numbers[i];
    }
    return total / numbers.length;
}

/**
 * Attempt to convert an array of strings to an array of numbers
 * @param {Array} numsAsStrings array of strings
 * @returns {Array|Error} an array or an error object
 */
function convertAndValidateNumsArray(numsAsStrings) {
    let result = [];
  
    for (let i = 0; i < numsAsStrings.length; i++) {
        let valToNumber = Number(numsAsStrings[i]);

        if (Number.isNaN(valToNumber)) {
            return new Error(
            `The value '${numsAsStrings[i]}' at index ${i} is not a valid number.`
            );
        }

        result.push(valToNumber);
    }
    return result;
}

/**
 * The "median" is the "middle" value in the list of numbers.
 *
 * @param {Array} numbers An array of numbers.
 * @return {Number} The calculated median value from the specified numbers.
 */

function median(numbers) {
    // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
    let median = 0, numsLen = numbers.length;
    numbers.sort();
 
    if (
        numsLen % 2 === 0 // is even
    ) {
        // average of two middle numbers
        median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
    } else { // is odd
        // middle number only
        median = numbers[(numsLen - 1) / 2];
    }
 
    return median;
}

/**
 * The "mode" is the number that is repeated most often.
 *
 * For example, the "mode" of [3, 5, 4, 4, 1, 1, 2, 3] is [1, 3, 4].
 *
 * @param {Array} numbers An array of numbers.
 * @return {Array} The mode of the specified numbers.
 */

function mode(numbers) {
    // as result can be bimodal or multi-modal,
    // the returned result is provided as an array
    // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
    let modes = [], count = [], i, number, maxIndex = 0;
 
    for (i = 0; i < numbers.length; i += 1) {
        number = numbers[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }
 
    for (i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                modes.push(Number(i));
            }
        }
    
    return Math.min(...modes);
 
    // return modes;
}

module.exports = {
    mean,
    convertAndValidateNumsArray,
    median,
    mode
};