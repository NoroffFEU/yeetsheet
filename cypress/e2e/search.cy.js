describe('Search and Display Data in Cells', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');

    // Add initial data to cells
    cy.window().then((win) => {
      const sheetContainer = win.document.getElementById(
        'spreadsheetContainer',
      );

      const cellA1 = win.document.createElement('td');
      cellA1.setAttribute('id', 'A1');
      cellA1.className =
        'p-0 w-28 border dark:border-ys-overlay-5 border-ys-amethyst-400 relative';
      cellA1.textContent = 'Test Data 1';
      sheetContainer.appendChild(cellA1);

      const cellB2 = win.document.createElement('td');
      cellB2.setAttribute('id', 'B2');
      cellB2.className =
        'p-0 w-28 border dark:border-ys-overlay-5 border-ys-amethyst-400 relative';
      cellB2.textContent = 'Test Data 2';
      sheetContainer.appendChild(cellB2);

      const cellC3 = win.document.createElement('td');
      cellC3.setAttribute('id', 'C3');
      cellC3.className =
        'p-0 w-28 border dark:border-ys-overlay-5 border-ys-amethyst-400 relative';
      cellC3.textContent = 'Test Data 3';
      sheetContainer.appendChild(cellC3);
    });
  });

  // Click on the search bar and enter a keyword
  it('should perform search with valid results and highlight the cell', () => {
    cy.get('[data-cy="search-input"]').click();
    cy.get('[data-cy="search-input"]').type('Test Data 2{enter}');
    cy.get('#B2').scrollIntoView();
    cy.get('#B2').should('contain.text', 'Test Data 2');
  });

  it('should perform search with no valid results and display a no results message', () => {
    cy.get('[data-cy="search-input"]').click();
    cy.get('[data-cy="search-input"]').type('Nonexistent Data{enter}');

    // Split the chain for the assertions
    cy.get('[data-cy="no-results-message"]').should('be.visible');
    cy.get('[data-cy="no-results-message"]').should(
      'contain.text',
      'No matching results found',
    );
  });
});
