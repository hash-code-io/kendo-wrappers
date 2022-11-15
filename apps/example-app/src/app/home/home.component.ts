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
