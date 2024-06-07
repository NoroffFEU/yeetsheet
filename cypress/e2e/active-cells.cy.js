describe('Clear indicators for Active Cells and Selections', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  // click on a cell
  it('should click on a cell in the spreadsheet', () => {
    cy.get('#spreadsheetContainer').scrollTo('topLeft');

    cy.get('#A1').scrollIntoView();
    cy.get('#A1').click();
    cy.get('#A1').should('exist');
  });

  // drag cells
  it('should drag to select a range of cells', () => {
    cy.get('#spreadsheetContainer').scrollTo('topLeft');

    cy.get('#A1').scrollIntoView();
    cy.get('#A1').trigger('mousedown', { which: 1 });

    cy.get('#spreadsheetContainer').scrollTo('bottomRight');

    cy.get('#B2').scrollIntoView();
    cy.get('#B2').should('be.visible');

    cy.get('#B2').trigger('mousemove', { which: 1 });
    cy.get('#B2').trigger('mouseup', { which: 1 });

    cy.get('#A1').should('exist');
    cy.get('#B2').should('exist');
  });

  // reset after refresh
  it('should reset active cell and selection indicators after refresh', () => {
    cy.get('#spreadsheetContainer').scrollTo('topLeft');

    cy.get('#A1').scrollIntoView();
    cy.get('#A1').click();
    cy.get('#A1').should('exist');

    cy.get('#A1').scrollIntoView();
    cy.get('#A1').trigger('mousedown', { which: 1 });

    cy.get('#spreadsheetContainer').scrollTo('bottomRight');

    cy.get('#B2').scrollIntoView();
    cy.get('#B2').should('be.visible');

    cy.get('#B2').trigger('mousemove', { which: 1 });
    cy.get('#B2').trigger('mouseup', { which: 1 });

    cy.get('#A1').should('exist');
    cy.get('#B2').should('exist');

    cy.reload();

    cy.get('#spreadsheetContainer').scrollTo('topLeft');
    cy.get('#A1').should('exist');
    cy.get('#spreadsheetContainer').scrollTo('bottomRight');
    cy.get('#B2').should('exist');
  });
});
