// return number of cells that can fit in the screen based on cellwidth and cellheight.
// Set default values for cellwidth and cellheight, but if adding props while calling it will overwrite the default values.
// This function will return an array with two values: width and height.
export default function userColsAndRows(
  height,
  width,
  cellwidth = 112,
  cellHeight = 26,
) {
  // Width and height defaults to window.innerWidth and window.innerHeight if not provided as arguments.
  width = Number(width) ? width : window.innerWidth;
  height = Number(height) ? height : window.innerHeight;

  // Calculate the number of columns and rows that will fit in the screen. -1 is subtracted due to the column and row headers/index.
  const cols = Math.floor(width / cellwidth) - 1;
  const rows = Math.floor(height / cellHeight) - 1;

  // returns an array with the number of cols and rows that will fit
  return [cols, rows];
}
