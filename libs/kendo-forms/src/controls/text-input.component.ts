import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextBoxModule } from '@progress/kendo-angular-inputs';
import { NgControl } from '@angular/forms';
import { baseControlImports, formControlWrapperAfter, formControlWrapperBefore } from './internal';
import { ControlBaseComponent } from './base/control-base.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hash-code-text-input',
  standalone: true,
  template: `
    ${formControlWrapperBefore}
    <kendo-textbox #underlyingControl [formControl]="$any(ngControl.control)"></kendo-textbox>
    ${formControlWrapperAfter}
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
  imports: [TextBoxModule, ...baseControlImports],
})
export class TextInputComponent extends ControlBaseComponent {
  public constructor(ngControl: NgControl) {
    super(ngControl);
  }
}
