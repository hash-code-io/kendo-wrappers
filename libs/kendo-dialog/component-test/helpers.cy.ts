import Chainable = Cypress.Chainable;

export const openDialogButtonSelector = '[data-cy=button]';
export const dialogSelector = 'kendo-dialog';
export const acceptButtonSelector = '[data-cy=accept]';
export const cancelButtonSelector = '[data-cy=cancel]';
export const closeTypeSelector = '[data-cy=closeType]';
export const resultEntriesSelector = '[data-cy=resultEntry]';
export const dialogCloseButtonSelector = 'button[title=Close]';
export const bodySelector = 'body';

export const dialogShouldBeVisible = (): Chainable => cy.get(dialogSelector).should('be.visible');
export const dialogShouldNotExist = (): Chainable => cy.get(dialogSelector).should('not.exist');
export const closeTypeShouldBeAccept = (): Chainable => cy.get(closeTypeSelector).should('have.text', 'Accept');
export const closeTypeShouldBeCancel = (): Chainable => cy.get(closeTypeSelector).should('have.text', 'Cancel');
export const resultListShouldBePresent = (): Chainable =>
  cy.get(resultEntriesSelector).should($entries => {
    expect($entries.length).to.eq(3);
    expect($entries.get(0)).to.contain.text('0');
    expect($entries.get(1)).to.contain.text('1');
    expect($entries.get(2)).to.contain.text('2');
  });
export const resultListShouldNotBePresent = (): Chainable => cy.get(resultEntriesSelector).should('not.exist');

export const clickAccept = (): Chainable => cy.get(acceptButtonSelector).click();
export const clickCancel = (): Chainable => cy.get(cancelButtonSelector).click();
export const clickClose = (): Chainable => cy.get(dialogCloseButtonSelector).click();
export const sendEscapeKey = (): Chainable => cy.get(bodySelector).trigger('keydown', { code: 'Escape' });

export const openDialog = (): void => {
  cy.get(openDialogButtonSelector).click();
  dialogShouldBeVisible();
};
