import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hash-code-home',
  standalone: true,
  template: `
    <h1>Navigate to tests from here</h1>
    <ul>
      <li>
        <a routerLink="dialog">Dialog</a>
      </li>
      <li>
        <a routerLink="forms">Forms</a>
      </li>
      <li>
        <a routerLink="popup">Popup</a>
      </li>
      <li>
        <a routerLink="layout">Layout</a>
      </li>
    </ul>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
  imports: [RouterLinkWithHref],
})
export class HomeComponent {}
