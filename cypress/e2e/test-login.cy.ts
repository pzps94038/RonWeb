describe('Test Login', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
  });
  const isProd = Cypress.env('production') as boolean;
  const baseUrl = Cypress.env('baseUrl');
  if (!isProd) {
    it('Test Login Success', () => {
      cy.visit(`${baseUrl}/login`);
      cy.intercept('post', 'api/login', {
        statusCode: 200,
        body: {
          returnCode: '00',
          returnMessage: '登入成功',
          data: {
            token: {
              accessToken: 'token',
              refreshToken: 'token',
            },
            userId: 1,
          },
        },
      });
      cy.get('#account').click();
      cy.get('#account').type('TestAccount');
      cy.get('#password').click();
      cy.get('#password').type('TestPassword');
      cy.get('.btn').click();
      cy.location('pathname').then(currentPath => {
        // 使用 cy.log() 輸出到 Cypress Test Runner
        cy.log(`Current path: ${currentPath}`);
      });
    });
    it('Test Login Fail', () => {
      cy.visit(`${baseUrl}/login`);
      cy.intercept('post', 'api/login', {
        statusCode: 200,
        body: {
          returnCode: '01',
          returnMessage: '登入失敗',
          data: {
            token: {
              accessToken: 'token',
              refreshToken: 'token',
            },
            userId: 1,
          },
        },
      }).as('loginData');
      cy.get('#account').click();
      cy.get('#account').type('TestAccount');
      cy.get('#password').click();
      cy.get('#password').type('TestPassword');
      cy.get('.btn').click();
      cy.wait('@loginData');
      cy.location('pathname').then(currentPath => {
        // 使用 cy.log() 輸出到 Cypress Test Runner
        cy.log(`Current path: ${currentPath}`);
        cy.url().should('include', '/login');
        cy.get('.alert').should('exist');
      });
    });
  } else {
    it('Test Login', () => {
      cy.visit(`${baseUrl}/login`);
      cy.pause();
      cy.get('.btn').click();
    });
  }
});
