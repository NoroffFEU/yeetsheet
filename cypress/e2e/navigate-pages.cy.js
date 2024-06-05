describe('Navigate Through Pages', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should be a new empty spreadsheet when opening a new page', () => {
    // Make sure that page 1 is open and on the screen
    cy.changePage(0);

    // Add some data in the cells
    cy.get('#A1').type('() => return 2 + 2 {enter}');
    cy.get('#A1').should('have.text', '4');

    // Save the changes
    cy.saveChanges();

    // Switch to a new page and make sure its visisble and no data in the cells
    cy.changePage(1);
    cy.get('#A1').should('have.text', '');
  });

  it('should retain the values on the pages when switching between them', () => {
    // Add some data in the cells
    cy.get('#A1').type('() => return 3 + 3 {enter}');
    cy.get('#A1').should('have.text', '6');

    // Save changes
    cy.saveChanges();

    // Switch back to the other spreadsheet and make sure the data is different
    cy.changePage(0);
    cy.get('#A1').should('have.text', '4');
  });

  it('should save both pages to IndexedDB', () => {
    // Check Page 1 IndexedDB
    cy.checkIndexedDBValues('SpreadsheetDB', 'cells', {
      A1: '() => return 2 + 2',
    });

    // Switch back to Page 2 and check IndexedDB
    cy.changePage(1);
    cy.checkIndexedDBValues('SpreadsheetDB', 'cells', {
      A1: '() => return 3 + 3',
    });
  });
});
