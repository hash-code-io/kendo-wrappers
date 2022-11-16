import { PickerDialogBase } from '../picker-dialog-base';
import { Type } from '@angular/core';
import { PickerComponentInputs } from './picker-component-inputs';
import { BaseDialogSettings } from '../internal';

export type PickerDialogOptions<TComponentType extends PickerDialogBase<TData>, TData> = BaseDialogSettings & {
  content: Type<TComponentType>;
  componentInputs?: PickerComponentInputs<TComponentType>;
};
