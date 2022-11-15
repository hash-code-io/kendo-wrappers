import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { RouterOutlet } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hash-code-root',
  standalone: true,
  template: ` <router-outlet></router-outlet>
    <div kendoDialogContainer></div>`,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
  imports: [DialogModule, RouterOutlet],
})
export class AppComponent {}
