import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InfoDialogBase } from '@hash-code/kendo-dialog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-test-warn-dialog',
  template: ` <span>Watch out!</span> `,
})
export class TestWarnDialogComponent extends InfoDialogBase {}
