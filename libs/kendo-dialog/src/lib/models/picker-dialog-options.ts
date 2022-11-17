import { PickerDialogBase } from '../picker-dialog-base';
import { Type } from '@angular/core';
import { BaseDialogSettings } from '../internal';

export type PickerDialogOptions<TComponentType extends PickerDialogBase<TData>, TData> = BaseDialogSettings & {
  content: Type<TComponentType>;
  componentInputs?: Partial<TComponentType>;
};
