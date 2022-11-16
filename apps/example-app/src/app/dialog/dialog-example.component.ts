import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestPickerDialogHostComponent } from './test-picker-dialog-host.component';
import { TestWarnDialogHostComponent } from './test-warn-dialog-host.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-dialog-example',
  template: `
    <div>
      <h1>Dialog Component</h1>
      <h3>
        Test the Picker component by clicking the button and then clicking either Ok, Cancel, ESC, or closing the window
      </h3>
    </div>
    <hash-code-test-picker-dialog-host></hash-code-test-picker-dialog-host>

    <h3>Test the Warn Dialog by clicking the button</h3>
    <hash-code-test-warn-dialog-host></hash-code-test-warn-dialog-host>
  `,
  imports: [TestPickerDialogHostComponent, TestWarnDialogHostComponent],
})
export class DialogExampleComponent {}
