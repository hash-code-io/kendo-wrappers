import { MountConfig } from 'cypress/angular';
import { TestHostComponent } from './test-picker-dialog.component.cy';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoModule } from '@ngneat/transloco';
import { DialogManagerService } from '../src';
import {
  clickAccept,
  clickCancel,
  clickClose,
  closeTypeShouldBeAccept,
  closeTypeShouldBeCancel,
  dialogShouldNotExist,
  openDialog,
  resultListShouldBePresent,
  resultListShouldNotBePresent,
  sendEscapeKey,
} from './helpers.cy';

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
