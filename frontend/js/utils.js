
/**
 * Get the value of the checked radio
 * @param {string} name
 */
function getCheckedRadioValue(name) {
    const radios = document.getElementsByName(name);
    for (let radio of radios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return null;
}

/**
 * Count how many empty strings in array.
 * @param {array<string>} strings
 * @returns number
 */
function countEmptyStrings(strings) {
    let count = 0;
    strings.forEach(str => {
       if (str.length === 0) {
           count++;
       }
    });
    return count;
}


/**
 *
 * @param {array<string>} strings
 * @param {number} offsetPivot
 * @return {([]|*)[]}
 */
function trimEmptyStrings(strings, offsetPivot) {
    const trimmedStrings = []
    for (let i = 0; i < strings.length; i++) {
        if (strings[i].length === 0) {
            if (i < offsetPivot) {
                offsetPivot--;
            }
        } else {
            trimmedStrings.push(strings[i]);
        }
    }
    return [trimmedStrings, offsetPivot];
}

export {getCheckedRadioValue, countEmptyStrings, trimEmptyStrings};