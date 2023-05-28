describe('Test Login', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
  });

  it('Test Login', () => {
    const baseUrl = Cypress.env('baseUrl');
    cy.visit(`${baseUrl}/login`);
    const isProd = Cypress.env('production') as boolean;
    if (!isProd) {
      cy.get('#account').click();
      cy.get('#account').type('TestAccount');
      cy.get('#password').click();
      cy.get('#password').type('TestPassword');
      cy.get('.btn').click();
    } else {
      cy.pause();
      cy.get('.btn').click();
    }
  });
});
