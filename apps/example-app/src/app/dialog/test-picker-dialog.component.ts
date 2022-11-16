import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PickerDialogBase } from '@hash-code/kendo-dialog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-test-picker-dialog',
  template: ` <div>This is where your Grid or whatever to select data would live!</div> `,
})
export class TestPickerDialogComponent extends PickerDialogBase<{ numbers: string[] }> {
  public constructor() {
    super();
    this.title = 'dialog.title';
    this.titleIcon = 'k-i-user';
  }

  public data: string[] = ['0', '1', '2'];

  public handleAcceptClick(): void {
    this.close({ type: 'Accept', data: { numbers: this.data } });
  }

  public handleCancelClick(): void {
    this.close({ type: 'Cancel' });
  }
}
