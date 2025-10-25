/// <reference types="cypress" />

describe('Article flow', () => {
  const timestamp = Date.now();
  const title = `Test Article ${timestamp}`;
  const description = `Description ${timestamp}`;
  const body = `Body content ${timestamp}`;
  const tag = 'TestTag';

  before(() => {
    // logowanie przed testami
    cy.login(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));
  });

  it('should create a new article', () => {
    // tworzymy artykuł
    cy.createArticle(title, description, body, [tag]);

    // asercje po utworzeniu
    cy.contains(title).should('be.visible');
    cy.contains(description).should('be.visible');
    cy.get('.tag-list').contains(tag).should('be.visible');
  });

  it('should delete an article', () => {
    // tworzymy artykuł do usunięcia
    cy.createArticle(title, description, body, [tag]);

    // otwieramy artykuł
    cy.contains(title).click();

    // klikamy Delete Article
    cy.contains('Delete Article').click();

    // asercja, że artykuł został usunięty
    cy.contains(title).should('not.exist');
  });
});
