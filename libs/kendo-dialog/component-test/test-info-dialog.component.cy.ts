import { ChangeDetectionStrategy, Component, Inject, InjectionToken, OnDestroy } from '@angular/core';
import { DialogManagerService, InfoDialogBase } from '../src';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

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
