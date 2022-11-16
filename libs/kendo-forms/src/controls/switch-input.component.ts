import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { SwitchModule } from '@progress/kendo-angular-inputs';
import { InputSize } from '@progress/kendo-angular-inputs/common/models';
import { baseControlImports, formControlWrapperAfter, formControlWrapperBefore } from './internal';
import { ControlBaseComponent } from './base/control-base.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hash-code-switch-input',
  standalone: true,
  template: `
    ${formControlWrapperBefore}
    <kendo-switch [size]="size" #underlyingControl [formControl]="$any(ngControl.control)"></kendo-switch>
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
  imports: [SwitchModule, ...baseControlImports],
})
export class SwitchInputComponent extends ControlBaseComponent {
  @Input() public size: InputSize = 'medium';

  public constructor(ngControl: NgControl) {
    super(ngControl);
  }
}
