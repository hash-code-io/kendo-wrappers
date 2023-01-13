import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-layout-example',
  template: `
    <div>
      <h1>Layout Component</h1>
      <h3>Test</h3>
    </div>
  `,
  imports: [],
  styles: [``],
})
export class LayoutExampleComponent {}
