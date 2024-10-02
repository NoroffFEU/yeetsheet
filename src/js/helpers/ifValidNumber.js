/**
 * Checks if the given values for columns and rows are valid numbers.
 * If the values are not valid, it throws an error.
 * If the values are not integers, it rounds them down to the nearest whole number.
 * If the values are less than 1, it throws an error.
 *
 * @param {number} cols - The number of columns.
 * @param {number} rows - The number of rows.
 * @param {number} [limit=100] - The limit for the number of columns or rows (default to 100).
 * @returns {number[] | undefined} - An array with the validated [cols, rows] or undefined if invalid
 */
export default function ifValidNumber(cols, rows, limit = 100) {
  // Check if cols or rows is not a number
  if (typeof cols !== 'number' || typeof rows !== 'number') {
    console.error('Invalid cols or rows');
    return undefined;
  }

  // Round down to nearest integer
  cols = Math.floor(cols);
  rows = Math.floor(rows);

  // Check if cols or rows is greater than the limit
  if (cols > limit || rows > limit) {
    console.error(`Cols and/or rows cannot be greater than ${limit}`);
    return undefined;
  }

  // Check if there are no columns or rows
  if (cols < 1 || rows < 1) {
    console.error('Invalid cols or rows');
    return undefined;
  }

  return [cols, rows];
}
