import { getTableMetadata, saveTableMetadata } from '../spreadsheet/db';

/**
 * Calculates the number of cells that can fit in the screen based on the provided cell width and cell height.
 *
 * This function returns an array with two values: the number of columns and the number of rows that can fit on the screen.
 * Default values for cell width and cell height are provided, but they can be overwritten by passing arguments.
 *
 * @function userColsAndRows
 * @param {number} [height=window.innerHeight] - The height of the screen. Defaults to window.innerHeight if not provided.
 * @param {number} [width=window.innerWidth] - The width of the screen. Defaults to window.innerWidth if not provided.
 * @param {number} [cellwidth=112] - The width of each cell. Defaults to 112 if not provided.
 * @param {number} [cellHeight=26] - The height of each cell. Defaults to 26 if not provided.
 * @returns {Array<number>} - An array containing two numbers: the number of columns and the number of rows.
 *
 */
export default async function userColsAndRows(
  height,
  width,
  cellwidth = 112,
  cellHeight = 26,
) {
  try {
    // Fetch the metadata for cols and rows from IndexedDB
    const { cols, rows } = await getTableMetadata();
    if (cols !== null && rows !== null) {
      // If metadata exists, return the stored values
      return [cols, rows];
    }
  } catch (error) {
    console.error('Error fetching table metadata:', error);
  }

  // Fallback to calculated values if no metadata is found
  width = Number(width) ? width : cellwidth * 31;
  height = Number(height) ? height : cellHeight * 31;

  const calculatedCols = Math.floor(width / cellwidth) - 1;
  const calculatedRows = Math.floor(height / cellHeight) - 1;

  // Store the calculated values in the database (if it's the first run)
  saveTableMetadata(calculatedCols, calculatedRows);

  return [calculatedCols, calculatedRows];
}
