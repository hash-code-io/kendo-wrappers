import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { DatePickerModule, FormatSettings } from '@progress/kendo-angular-dateinputs';
import { baseControlImports, formControlWrapperAfter, formControlWrapperBefore } from './internal';
import { ControlBaseComponent } from './base/control-base.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hash-code-date-picker',
  standalone: true,
  template: `
    ${formControlWrapperBefore}
    <kendo-datepicker
      #underlyingControl
      [formControl]="$any(ngControl.control)"
      [format]="dateFormat!"
      [min]="min!"
      [max]="max!"
    ></kendo-datepicker>
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
  imports: [DatePickerModule, ...baseControlImports],
})
export class DatePickerComponent extends ControlBaseComponent {
  @Input() public min?: Date;
  @Input() public max?: Date;
  @Input() public dateFormat?: string | FormatSettings;

  public constructor(ngControl: NgControl) {
    super(ngControl);
  }
}
