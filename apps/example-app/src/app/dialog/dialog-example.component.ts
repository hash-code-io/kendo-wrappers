import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestHostComponent } from './test-dialog-host.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-dialog-example',
  template: `
    <div>
      <h1>Dialog Component</h1>
      <h3>Test the component by clicking the button and then clicking either Ok, Cancel, ESC, or closing the window</h3>
    </div>
    <hash-code-test-dialog-host></hash-code-test-dialog-host>
  `,
  imports: [TestHostComponent],
})
export class DialogExampleComponent {}
