import { DialogManagerService } from './dialog-manager.service';
import { MountConfig } from 'cypress/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeDetectionStrategy, Component, Inject, InjectionToken, OnDestroy } from '@angular/core';
import { InfoDialogBase } from '../info-dialog-base';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { PickerDialogBase } from '../picker-dialog-base';
import { isAcceptResult } from '../helpers';
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

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-test-warn-dialog',
  template: ` <span>Watch out!</span> `,
})
export class TestWarnDialogComponent extends InfoDialogBase {}

export const CONTENT_TYPE_TOKEN = new InjectionToken<'Component' | 'String'>('CONTENT_TYPE_TOKEN');

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-test-warn-dialog-host',
  template: `
    <button data-cy="button" kendoButton (click)="openDialog()">Open Dialog</button>
    <div data-cy="closeType" *ngIf="closeType">{{ closeType }}</div>
    <div kendoDialogContainer></div>
  `,
  imports: [DialogModule, ButtonModule, CommonModule],
})
export class TestWarnDialogHostComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  public constructor(
    private dialogService: DialogManagerService,
    @Inject(CONTENT_TYPE_TOKEN) private type: 'Component' | 'String'
  ) {}

  public closeType?: 'Accept' | 'Cancel';

  public openDialog(): void {
    const res$ =
      this.type === 'Component'
        ? this.dialogService.openInfoDialog$<TestWarnDialogComponent>({
            content: TestWarnDialogComponent,
            animation: false,
            title: 'title',
          })
        : this.dialogService.openInfoDialog$({
            content: 'dialog.super-serious-warning',
            animation: false,
            title: 'title',
          });

    // in a real app come up with a better way than to subscribe (i.e. ComponentStore)
    res$.pipe(takeUntil(this.destroy$)).subscribe(result => (this.closeType = result));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-test-dialog',
  template: ` <div>This is where your Grid or whatever to select data would live!</div> `,
})
export class TestDialogComponent extends PickerDialogBase<{ data: string[] }> {
  public constructor() {
    super();
    this.title = 'title';
  }

  public data: string[] = ['0', '1', '2'];

  public handleAcceptClick(): void {
    this.close({ type: 'Accept', data: { data: this.data } });
  }

  public handleCancelClick(): void {
    this.close({ type: 'Cancel' });
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-test-host',
  template: `
    <button data-cy="button" kendoButton (click)="openDialog()">Open Dialog</button>
    <div data-cy="closeType" *ngIf="closeType">{{ closeType }}</div>
    <ng-container *ngIf="data">
      <ul *ngFor="let entry of data">
        <li data-cy="resultEntry">{{ entry }}</li>
      </ul>
    </ng-container>
    <div kendoDialogContainer></div>
  `,
  imports: [DialogModule, ButtonModule, CommonModule],
})
export class TestHostComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  public constructor(private dialogService: DialogManagerService) {}

  public data?: string[];
  public closeType?: 'Accept' | 'Cancel';

  public openDialog(): void {
    this.dialogService
      .openPickerDialog$<TestDialogComponent, { data: string[] }>({
        content: TestDialogComponent,
        animation: false,
      })
      // in a real app come up with a better way than to subscribe (i.e. ComponentStore)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.closeType = result.type;
        if (isAcceptResult(result)) {
          this.data = result.data.data;
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

//TODO: with Cypress 11 we can fix translations
describe(`${DialogManagerService.name}`, () => {
  describe('Info', () => {
    describe('Via Component', () => {
      const config: MountConfig<TestWarnDialogHostComponent> = {
        imports: [NoopAnimationsModule, TranslocoModule],
        providers: [{ provide: CONTENT_TYPE_TOKEN, useValue: 'Component' }],
      };

      runTests(config);
    });

    describe('Via String', () => {
      const config: MountConfig<TestWarnDialogHostComponent> = {
        imports: [NoopAnimationsModule, TranslocoModule],
        providers: [{ provide: CONTENT_TYPE_TOKEN, useValue: 'String' }],
      };

      runTests(config);
    });
  });

  describe(`Picker`, () => {
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
