/**
 * Checks if the given values for columns and rows are valid numbers.
 * If the values are not valid, it throws an error.
 * If the values are not integers, it rounds them down to the nearest whole number.
 * If the values are less than 1, it throws an error.
 *
 * @param {number} cols - The number of columns.
 * @param {number} rows - The number of rows.
 * @param {number} [limit=100] - The limit for the number of columns or rows (default to 100).
 * @returns {void}
 */
export default function ifValidNumber(cols, rows, limit = 100) {
  // Console.errors if cols or rows is not a number
  if (typeof cols !== 'number' || typeof rows !== 'number')
    return console.error('Invalid cols or rows');

  // Console.errors if cols or rows is greater than the limit
  if (cols > limit || rows > limit) {
    return console.error(`Cols and/or rows cannot be greater than ${limit}`);
  }

  // If cols or rows is not an integer, round it down to the nearest whole number
  if (!Number.isInteger(cols) || !Number.isInteger(rows))
    return console.error('cols and rows needs to be whole numbers (integers)');

  // Console.errors if there is no columns or rows
  if (cols < 1 || rows < 1) return console.error('Invalid cols or rows');

  return [cols, rows];
}
