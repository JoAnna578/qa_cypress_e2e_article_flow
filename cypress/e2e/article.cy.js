/// <reference types="cypress" />

describe('Article flow', () => {
  it('should create a new article', () => {
    const timestamp = Date.now();
    const email = `user${timestamp}@mail.com`;
    const password = `Password${timestamp}!`;
    const username = `User${timestamp}`;

    const title = `Test Article ${timestamp}`;
    const description = `Description ${timestamp}`;
    const body = `Body content ${timestamp}`;
    const tag = 'TestTag';

    // Tworzymy nowego użytkownika i logujemy się
    cy.register(username, email, password);
    cy.login(email, password);

    // Tworzymy artykuł
    cy.createArticle(title, description, body, [tag]);

    // Assercje
    cy.contains(title).should('be.visible');
    cy.contains(description).should('be.visible');
    cy.get('.tag-list').contains(tag).should('be.visible');
  });

  it('should delete an article', () => {
    const timestamp = Date.now();
    const email = `user${timestamp}@mail.com`;
    const password = `Password${timestamp}!`;
    const username = `User${timestamp}`;

    const title = `Test Article ${timestamp}`;
    const description = `Description ${timestamp}`;
    const body = `Body content ${timestamp}`;
    const tag = 'TestTag';

    // Tworzymy nowego użytkownika i logujemy się
    cy.register(username, email, password);
    cy.login(email, password);

    // Tworzymy artykuł do usunięcia
    cy.createArticle(title, description, body, [tag]);

    // Usuwamy artykuł
    cy.contains(title).click();
    cy.contains('Delete Article').click();

    // Assercja po usunięciu
    cy.contains(title).should('not.exist');
  });
});
