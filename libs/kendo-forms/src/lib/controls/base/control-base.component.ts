import { Directive, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ErrorMessages } from '../models';

@Directive()
export abstract class ControlBaseComponent {
  @Input() public errorMessages: ErrorMessages = {};
  @Input() public hintMessage?: string;
  @Input() public label = '';
  @Input() public optional = false;

  @ViewChild('underlyingControl', { static: true }) private set formControl(value: ControlValueAccessor) {
    if (!value)
      throw new Error(
        'Class implementing ControlBaseComponent must have a static view child that implements ControlValueAccessor with the template variable name #underlyingControl'
      );
    this.ngControl.valueAccessor = value;
  }

  protected constructor(public ngControl: NgControl) {}
}
