import { testUrl } from '../support/config';

describe('Clear and Intuitive Layout', () => {
  it('Opens the webpage', () => {
    cy.visit(testUrl);
  });

  it('has a good and visible layout', () => {
    cy.visit(testUrl);

    // check that app-container takes full size of the browser
    cy.get('body')
      .should('be.visible')
      .then((body) => {
        cy.get('[data-cy="app-container"]').should((container) => {
          expect(container).to.have.css('width', `${body.width()}px`);
          expect(container).to.have.css('height', `${body.height()}px`);
        });
      });
    // check that sidebar, topnav and utilities are visible
    cy.get('[data-cy="top-nav"]').should('be.visible');
    cy.get('[data-cy="sidebar"]').should('be.visible');
    cy.get('[data-cy="app-utilities"]').should('be.visible');
  });

  it('shows spreadsheet and utilities', () => {
    cy.visit(testUrl);
    cy.get('[data-cy="spreadsheet"]').should('be.visible');

    //  code editor, console, and terminal panel are visible and accessible.
    testUtilNav('code-editor-btn', 'util:code-editor');
    // TODO: uncomment lines below when the UI supports them
    // testUtilNav('console-btn', 'util:console');
    // testUtilNav('errors-btn', 'util:errors');
    // testUtilNav('terminal-btn', 'util:terminal');
  });

  function testUtilNav(button, element) {
    cy.get(`[data-cy="${button}"]`).should('be.visible').click();
    cy.get(`[data-cy="${element}"]`).should('be.visible');
  }
});
