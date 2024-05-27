// return number of cells that can fit in the screen based on cellwidth and cellheight.
// Set default values for cellwidth and cellheight, but if adding props while calling it will overwrite the default values.
// This function will return an array with two values: width and height.
export default function userColsAndRows(cellwidth = 112, cellHeight = 26) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const cols = Math.floor(width / cellwidth) - 1;
  const rows = Math.floor(height / cellHeight) - 1;

  return [cols, rows];
}
