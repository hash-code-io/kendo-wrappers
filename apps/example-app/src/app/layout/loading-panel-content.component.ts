import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'hash-code-loading-panel-content',
  template: ` <h3>Some awesome content</h3> `,
  imports: [],
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
        background-color: lemonchiffon;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class LoadingPanelContentComponent {}
