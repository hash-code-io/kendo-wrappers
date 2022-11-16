import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NumericTextBoxModule } from '@progress/kendo-angular-inputs';
import { NgControl } from '@angular/forms';
import { NumberFormatOptions } from '@progress/kendo-angular-intl';
import { baseControlImports, formControlWrapperAfter, formControlWrapperBefore } from './internal';
import { ControlBaseComponent } from './base/control-base.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hash-code-numeric-input',
  standalone: true,
  template: `
    ${formControlWrapperBefore}
    <kendo-numerictextbox
      #underlyingControl
      [formControl]="$any(ngControl.control)"
      [format]="format!"
      [min]="min!"
      [max]="max!"
      [step]="step!"
      [autoCorrect]="autoCorrect"
      [spinners]="spinners"
      [decimals]="decimals!"
    ></kendo-numerictextbox>
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
  imports: [NumericTextBoxModule, ...baseControlImports],
})
export class NumericInputComponent extends ControlBaseComponent {
  @Input() public spinners = false;
  @Input() public format?: string | NumberFormatOptions | null;
  @Input() public min?: number;
  @Input() public max?: number;
  @Input() public step?: number;
  @Input() public decimals?: number;
  @Input() public autoCorrect = false;

  public constructor(ngControl: NgControl) {
    super(ngControl);
  }
}
