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

// return number of cells that can fit in the screen based on cellwidth and cellheight.
// Set default values for cellwidth and cellheight, but if adding props while calling it will overwrite the default values.
// This function will return an array with two values: width and height.
export default function userColsAndRows(
  height,
  width,
  cellwidth = 112,
  cellHeight = 26,
) {
  // Width and height defaults set to cell width and height * 50
  width = Number(width) ? width : cellwidth * 51;
  height = Number(height) ? height : cellHeight * 51;

  // Calculate the number of columns and rows that will fit in the screen. -1 is subtracted due to the column and row headers/index.
  const cols = Math.floor(width / cellwidth) - 1;
  const rows = Math.floor(height / cellHeight) - 1;

  // returns an array with the number of cols and rows that will fit
  return [cols, rows];
}
