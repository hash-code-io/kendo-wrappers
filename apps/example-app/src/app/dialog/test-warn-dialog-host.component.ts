import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DialogManagerService } from '@hash-code/kendo-dialog';
import { TestWarnDialogComponent } from './test-warn-dialog.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-test-warn-dialog-host',
  template: ` <button kendoButton (click)="openDialog('component')">Open Component Dialog</button>
    <button kendoButton (click)="openDialog('string')">Open String Dialog</button>`,
  imports: [ButtonModule],
})
export class TestWarnDialogHostComponent {
  public constructor(private dialogService: DialogManagerService) {}

  public openDialog(type: 'string' | 'component'): void {
    if (type === 'string') {
      this.dialogService.openInfoDialog$({
        content: 'warnDialog.body',
        title: 'dialog.title',
        titleIcon: 'k-i-user',
      });
    } else {
      this.dialogService.openInfoDialog$({
        content: TestWarnDialogComponent,
        title: 'dialog.title',
      });
    }
  }
}
