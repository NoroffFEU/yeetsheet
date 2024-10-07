const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
console.log(alphabet);

/**
 * Converts a number to letters in the alphabet (A-Z).
 * @param {number} number - The number to be converted.
 * @returns {string} The letter(s) representation of the number.
 */
export default function numberToLetter(number) {
  if (number < 26) {
    return alphabet[number];
  } else {
    // if number is greater than 26 it will return as 2 letters (starting with AA, AB, AC, etc.)
    // if needed in future with more than 2 letters, then code needs to be modified (currently not needed)
    const firstLetter = alphabet[Math.floor(number / 26) - 1];
    const secondLetter = alphabet[number % 26];
    return firstLetter + secondLetter;
  }
}
