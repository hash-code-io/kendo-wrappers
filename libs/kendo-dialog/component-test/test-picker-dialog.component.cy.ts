import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { CommonModule } from '@angular/common';
import { DialogManagerService, isAcceptResult, PickerDialogBase } from '../src';

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
