import { DialogManagerService } from '../src';
import { MountConfig } from 'cypress/angular';
import { CONTENT_TYPE_TOKEN, TestWarnDialogHostComponent } from './test-info-dialog.component.cy';
import { TranslocoModule } from '@ngneat/transloco';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  clickAccept,
  clickCancel,
  clickClose,
  closeTypeShouldBeAccept,
  closeTypeShouldBeCancel,
  dialogShouldNotExist,
  openDialog,
  sendEscapeKey,
} from './helpers.cy';

//TODO: with Cypress 11 we can fix translations
describe(`${DialogManagerService.name} - Info`, () => {
  describe('Via Component', () => {
    const config: MountConfig<TestWarnDialogHostComponent> = {
      imports: [NoopAnimationsModule, TranslocoModule],
      providers: [{ provide: CONTENT_TYPE_TOKEN, useValue: 'Component' }],
    };

    runTests(config);
  });

  describe('Via Component', () => {
    const config: MountConfig<TestWarnDialogHostComponent> = {
      imports: [NoopAnimationsModule, TranslocoModule],
      providers: [{ provide: CONTENT_TYPE_TOKEN, useValue: 'String' }],
    };

    runTests(config);
  });
});

function runTests(config: MountConfig<TestWarnDialogHostComponent>): void {
  it('have accept type on accept', () => {
    cy.mount(TestWarnDialogHostComponent, config);
    openDialog();
    clickAccept();
    dialogShouldNotExist();
    closeTypeShouldBeAccept();
  });

  it('have cancel type on cancel button click', () => {
    cy.mount(TestWarnDialogHostComponent, config);
    openDialog();
    clickCancel();
    dialogShouldNotExist();
    closeTypeShouldBeCancel();
  });

  it('have cancel type on close button click', () => {
    cy.mount(TestWarnDialogHostComponent, config);
    openDialog();
    clickClose();
    dialogShouldNotExist();
    closeTypeShouldBeCancel();
  });

  it('have cancel type on escape click', () => {
    cy.mount(TestWarnDialogHostComponent, config);
    openDialog();
    sendEscapeKey();
    dialogShouldNotExist();
    closeTypeShouldBeCancel();
  });
}
