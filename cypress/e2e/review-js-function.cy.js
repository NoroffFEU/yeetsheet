describe('Review JavaScript Function', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should be able to display the return value of a function in a cell', () => {
    // Enter a JavaScript function in a cell and check the return value
    cy.get('#A1').type('() => return 2 + 2 {enter}');
    cy.get('#A1').should('have.text', '4');
  });

  it('should be able to edit the function in the code panel below the spreadsheet', () => {
    // Move to the code editor and check that it is correctly displaying
    cy.get('[data-cy="code-editor-btn"]').click();
    cy.get('[data-cy="app-utilities"] textarea').should('be.visible');

    // Change the function in the code editor
    cy.get('[data-cy="app-utilities"] textarea').type(
      '() => return 3 + 3 {enter}',
    );
    cy.saveChanges();

    // Verify that the cell's value is changed after having edited the function
    cy.get('#A1').should('have.text', '6');
  });

  it('should successfully save the javascript function in IndexedDB', () => {
    // Check that the function is added to IndexedDB
    cy.checkIndexedDBValues('SpreadsheetDB', 'cells', {
      A1: '() => return 3 + 3',
    });
  });
});
