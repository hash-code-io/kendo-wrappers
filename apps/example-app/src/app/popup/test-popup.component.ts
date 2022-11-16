import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataPopupBase } from '@hash-code/kendo-popup';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-test-popup',
  template: `
    <span>Here is some content:</span>
    <ul>
      <li>First Content Item</li>
      <li>Second Content Item</li>
      <li>Third Content Item that is also really long</li>
    </ul>
  `,
  imports: [],
  styles: [
    `
      ul {
        margin-right: 1rem;
      }
    `,
  ],
})
export class TestPopupComponent extends DataPopupBase<string> {}
