let highlightedRow = null;

/**
 * Highlights a row when the row header is clicked.
 * If the row is already highlighted, it removes the highlight.
 *
 * @param {HTMLElement} rowElement - The row header element that was clicked.
 */
export function highlightRow(rowElement) {
  rowElement.addEventListener('click', () => {
    // Check if the clicked row is already highlighted
    if (highlightedRow === rowElement.closest('tr')) {
      // If it is, remove the highlight
      highlightedRow.classList.remove('highlight-row');
      highlightedRow = null; // Reset the highlighted row
    } else {
      // Remove highlight from previously highlighted row if it exists
      if (highlightedRow) {
        highlightedRow.classList.remove('highlight-row');
      }

      // Highlight the clicked row
      highlightedRow = rowElement.closest('tr');
      highlightedRow.classList.add('highlight-row');
    }
  });
}

let highlightedColumn = null;
/**
 * Highlights a column when the column header is clicked.
 * If the column is already highlighted, it removes the highlight.
 *
 * @param {number} columnIndex - The index of the column to be highlighted.
 */
export function highlightColumn(columnIndex) {
  const columnHeader = document.querySelector(`th[data-col="${columnIndex}"]`);

  if (columnHeader) {
    columnHeader.addEventListener('click', () => {
      // Check if the clicked column is already highlighted
      if (highlightedColumn === columnIndex) {
        // If it is, remove the highlight
        document
          .querySelectorAll(`td[data-col="${highlightedColumn}"]`)
          .forEach((td) => {
            td.classList.remove('highlight-column');
          });
        columnHeader.classList.remove('highlight-column');
        highlightedColumn = null; // Reset the highlighted column
      } else {
        // Remove highlight from previously highlighted column if it exists
        if (highlightedColumn !== null) {
          document
            .querySelectorAll(`td[data-col="${highlightedColumn}"]`)
            .forEach((td) => {
              td.classList.remove('highlight-column');
            });
          document
            .querySelector(`th[data-col="${highlightedColumn}"]`)
            .classList.remove('highlight-column');
        }
        // Set the new highlighted column
        highlightedColumn = columnIndex;

        // Highlight all cells in the selected column
        document
          .querySelectorAll(`td[data-col="${highlightedColumn}"]`)
          .forEach((td) => {
            td.classList.add('highlight-column');
          });
        columnHeader.classList.add('highlight-column');
      }
    });
  }
}
