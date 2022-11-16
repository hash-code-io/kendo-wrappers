import { MountConfig } from 'cypress/angular';
import { TestHostComponent } from './test-picker-dialog.component.cy';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoModule } from '@ngneat/transloco';
import { DialogManagerService } from '../src';
import Chainable = Cypress.Chainable;

const openDialogButtonSelector = '[data-cy=button]';
const dialogSelector = 'kendo-dialog';
const acceptButtonSelector = '[data-cy=accept]';
const cancelButtonSelector = '[data-cy=cancel]';
const closeTypeSelector = '[data-cy=closeType]';
const resultEntriesSelector = '[data-cy=resultEntry]';
const dialogCloseButtonSelector = 'button[title=Close]';
const bodySelector = 'body';

const dialogShouldBeVisible = (): Chainable => cy.get(dialogSelector).should('be.visible');
const dialogShouldNotExist = (): Chainable => cy.get(dialogSelector).should('not.exist');
const closeTypeShouldBeAccept = (): Chainable => cy.get(closeTypeSelector).should('have.text', 'Accept');
const closeTypeShouldBeCancel = (): Chainable => cy.get(closeTypeSelector).should('have.text', 'Cancel');
const resultListShouldBePresent = (): Chainable =>
  cy.get(resultEntriesSelector).should($entries => {
    expect($entries.length).to.eq(3);
    expect($entries.get(0)).to.contain.text('0');
    expect($entries.get(1)).to.contain.text('1');
    expect($entries.get(2)).to.contain.text('2');
  });
const resultListShouldNotBePresent = (): Chainable => cy.get(resultEntriesSelector).should('not.exist');

const clickAccept = (): Chainable => cy.get(acceptButtonSelector).click();
const clickCancel = (): Chainable => cy.get(cancelButtonSelector).click();
const clickClose = (): Chainable => cy.get(dialogCloseButtonSelector).click();
const sendEscapeKey = (): Chainable => cy.get(bodySelector).trigger('keydown', { code: 'Escape' });

const openDialog = (): void => {
  cy.get(openDialogButtonSelector).click();
  dialogShouldBeVisible();
};

//TODO: with Cypress 11 we can fix translations
describe(`${DialogManagerService.name} - Picker`, () => {
  const config: MountConfig<TestHostComponent> = {
    imports: [NoopAnimationsModule, TranslocoModule],
  };

  it('retrieve data on accept', () => {
    cy.mount(TestHostComponent, config);
    openDialog();
    clickAccept();
    dialogShouldNotExist();
    closeTypeShouldBeAccept();
    resultListShouldBePresent();
  });

  it('have no data on cancel button click', () => {
    cy.mount(TestHostComponent, config);
    openDialog();
    clickCancel();
    dialogShouldNotExist();
    closeTypeShouldBeCancel();
    resultListShouldNotBePresent();
  });

  it('have no data on close button click', () => {
    cy.mount(TestHostComponent, config);
    openDialog();
    clickClose();
    dialogShouldNotExist();
    closeTypeShouldBeCancel();
    resultListShouldNotBePresent();
  });

  it('have no data on escape click', () => {
    cy.mount(TestHostComponent, config);
    openDialog();
    sendEscapeKey();
    dialogShouldNotExist();
    closeTypeShouldBeCancel();
    resultListShouldNotBePresent();
  });
});
