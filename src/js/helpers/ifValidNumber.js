/**
 * Checks if the given values for columns and rows are valid numbers.
 * Throws an error if the values are not valid.
 * If the values are not integers, it rounds them down to the nearest whole number.
 *
 * @param {number} cols - The number of columns.
 * @param {number} rows - The number of rows.
 * @param {number} [limit=100] - The limit for the number of columns or rows (default to 100).
 * @returns {number[]} An array containing the validated [cols, rows].
 * @throws {Error} If inputs are invalid.
 */
export default function ifValidNumber(cols, rows, limit = 100) {
  if (typeof cols !== 'number' || typeof rows !== 'number') {
    throw new Error('Invalid input: cols and rows must be numbers');
  }

  cols = Math.floor(cols);
  rows = Math.floor(rows);

  if (cols > limit || rows > limit) {
    throw new Error(`Cols and rows cannot be greater than ${limit}`);
  }

  if (cols < 1 || rows < 1) {
    throw new Error('Cols and rows must be greater than 0');
  }

  return [cols, rows];
}
