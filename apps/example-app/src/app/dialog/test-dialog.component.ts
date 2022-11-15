import { ChangeDetectionStrategy, Component } from '@angular/core';
import { closeOnAccept, closeOnCancel, PickerDialogBase } from '@hash-code/kendo-dialog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-test-dialog',
  template: ` <div>This is where your Grid or whatever to select data would live!</div> `,
})
export class TestDialogComponent extends PickerDialogBase<{ numbers: string[] }> {
  public constructor() {
    super();
    this.title = 'dialog.title';
    this.titleIcon = 'k-i-user';
  }

  public data: string[] = ['0', '1', '2'];

  public handleAcceptClick(closeDialog: closeOnAccept<{ numbers: string[] }>): void {
    closeDialog({ numbers: this.data });
  }

  public handleCancelClick(closeDialog: closeOnCancel): void {
    closeDialog();
  }
}
