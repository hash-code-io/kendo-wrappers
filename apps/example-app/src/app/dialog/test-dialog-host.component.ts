import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { DialogManagerService, isAcceptResult } from '@hash-code/kendo-dialog';
import { TestDialogComponent } from './test-dialog.component';

interface DialogInfo {
  data?: string[];
  closeType: 'Accept' | 'Cancel';
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-test-dialog-host',
  template: `
    <button kendoButton (click)="openDialog()">Open Dialog</button>
    <ng-container *ngIf="data$ | async as data">
      <span style="padding-left: 5px">CloseType was: {{ data.closeType }}</span>
      <ng-container *ngIf="data.data">
        <ul *ngFor="let entry of data.data">
          <li>{{ entry }}</li>
        </ul>
      </ng-container>
    </ng-container>
  `,
  imports: [DialogModule, ButtonModule, CommonModule],
})
export class TestHostComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  public constructor(private dialogService: DialogManagerService) {}

  public data$ = new Subject<DialogInfo>();

  public openDialog(): void {
    this.dialogService
      .openPickerDialog$<TestDialogComponent, { numbers: string[] }>({
        content: TestDialogComponent,
        animation: false,
      })
      // in a real app come up with a better way than to subscribe (i.e. ComponentStore)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (isAcceptResult(result)) {
          this.data$.next({ data: result.data.numbers, closeType: result.type });
        } else {
          this.data$.next({ closeType: 'Cancel' });
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
