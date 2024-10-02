const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/**
 * Converts a number to letters in the alphabet (A-Z).
 * @param {number} number - The number to be converted (0-based index).
 * @returns {string|undefined} The letter(s) representation of the number, or undefined for invalid inputs.
 */
export default function numberToLetter(number) {
  if (typeof number !== 'number' || number < 0 || !Number.isInteger(number)) {
    return undefined;
  }

  let result = '';
  let n = number + 1; // Adjust for 1-based indexing

  while (n > 0) {
    n--; // Decrement first to handle the case of multiples of 26 correctly
    result = alphabet[n % 26] + result;
    n = Math.floor(n / 26);
  }

  return result;
}
